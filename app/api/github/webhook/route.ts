import { handleGithubWebhook } from "@/features/github/server/webhook-handler";

export const dynamic = "force-dynamic";
export const POST = handleGithubWebhook;
