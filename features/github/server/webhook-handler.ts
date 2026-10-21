import { getGithubApp } from "../utils/github-app";
import { savePullRequest } from "@/features/reviews/server/save-pull-request";

const REVIEWABLE_ACTIONS: ReadonlySet<string> = new Set([
  "opened",
  "synchronize",
  "reopened",
]);

export type PullRequestWebhookPayload = {
  // webhook actions e.g. "opened", "synchronize", "closed", "reopened"
  action: string;

  /** Gihub app installation that received the webhook */

  installation: { id: number };
  repository: { full_name: string };
  pull_request: {
    number: number;
    title: string;
    user: { login: string } | null;
    head: { sha: string };
    base: { ref: string };
  };
};

async function isSignatureValid(payload: string, signature: string | null) {
  if (!signature) {
    return false;
  }

  const app = await getGithubApp();

  return app.webhooks.verify(payload, signature);
}

export async function handleGithubWebhook(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  const eventName = request.headers.get("x-github-event");
  

  const isValid = await isSignatureValid(payload, signature);

  if (!isValid) {
    console.error("GitHub webhook signature verification failed", {
      eventName,
      hasSignature: Boolean(signature),
      hasWebhookSecret: Boolean(process.env.GITHUB_WEBHOOK_SECRET),
    });
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (eventName !== "pull_request") {
    return Response.json({ received: true });
  }

  let event: PullRequestWebhookPayload;
  try {
    event = JSON.parse(payload) as PullRequestWebhookPayload;
    console.log(event);
  } catch {
    console.error("GitHub webhook payload is not valid JSON", { eventName });
    return Response.json(
      { message: "Invalid webhook payload" },
      { status: 400 },
    );
  }

  console.info("Received GitHub pull_request event", {
    action: event.action,
    repository: event.repository.full_name,
    pullRequestNumber: event.pull_request.number,
  });

  if (!REVIEWABLE_ACTIONS.has(event.action)) {
    console.info("Ignoring non-reviewable GitHub pull_request action", {
      action: event.action,
    });
    return Response.json({ received: true });
  }

  const pullRequest = await savePullRequest(event);
  console.info("Saved GitHub pull request", {
    repository: event.repository.full_name,
    pullRequestNumber: event.pull_request.number,
  });

  //[TODO] : Map gihub installatin id

  //[TODo] : Trigger PR review job

  return Response.json({ received: true, pullRequest });
}
