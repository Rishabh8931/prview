import { handleGithubWebhook } from "@/features/github/server/webhook-handler";

export const dynamic = "force-dynamic";
export const POST = handleGithubWebhook;

export function GET() {
  return Response.json({
    ok: true,
    message: "GitHub webhook endpoint is reachable. Use POST for deliveries.",
  });
}
