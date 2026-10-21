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

export async function handleGihubWebhook(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  const eventName = request.headers.get("x-github-event");
  let event: PullRequestWebhookPayload | null = null;

  if (eventName === "pull_request") {
    event = JSON.parse(payload) as PullRequestWebhookPayload;
    console.info("Received GitHub pull_request webhook:", event);
  }

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

  if (!event) {
    event = JSON.parse(payload) as PullRequestWebhookPayload;
  }

  if (!REVIEWABLE_ACTIONS.has(event.action)) {
    return Response.json({ received: true });
  }

  const pullRequest = await savePullRequest(event);

  //[TODO] : Map gihub installatin id

  //[TODo] : Trigger PR review job

  return Response.json({ received: true, pullRequest });
}
