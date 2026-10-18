import { App } from "octokit";

let githubApp: App | null = null;

export function getGithubApp() {
  if (!githubApp) {
    const privateKey =
      process.env.GITHUB_APP_PRIVATE_KEY ?? process.env.GITHUB_PRIVATE_KEY;

    if (!privateKey) {
      throw new Error(
        "GITHUB_APP_PRIVATE_KEY or GITHUB_PRIVATE_KEY is required",
      );
    }

    githubApp  = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey: privateKey.replace(/\\n/g, "\n"),
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
    });
  }

  return githubApp;
}

export function getGithubInstallUrl(userId: string) {
  const publicAppUrl = process.env.NEXT_PUBLIC_GITHUB_PUBLIC_LINK;

  if (!publicAppUrl) {
    throw new Error("NEXT_PUBLIC_GITHUB_PUBLIC_LINK is required");
  }

  const url = new URL(publicAppUrl);
  url.pathname = `${url.pathname.replace(/\/$/, "")}/installations/new`;
  // `state` round-trips through GitHub so we can link the installation to this user.
  url.searchParams.set("state", userId);
  return url.toString();
}
