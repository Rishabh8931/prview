import { spawn } from "node:child_process";

const port = process.env.PORT ?? "3000";
const ngrokApiUrl = "http://127.0.0.1:4040/api/tunnels";

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function getPublicUrl() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(ngrokApiUrl);
      if (response.ok) {
        const tunnels = await response.json();
        const httpsTunnel = tunnels.tunnels?.find((tunnel) =>
          tunnel.public_url?.startsWith("https://"),
        );

        if (httpsTunnel?.public_url) {
          return httpsTunnel.public_url;
        }
      }
    } catch {
      // ngrok is still starting.
    }

    await sleep(500);
  }

  throw new Error("Timed out waiting for ngrok to expose a public HTTPS URL.");
}

const ngrok = spawn("ngrok", ["http", port], {
  stdio: ["ignore", "pipe", "pipe"],
});

let next;
let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  next?.kill(signal);
  ngrok.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

try {
  const publicUrl = await getPublicUrl();
  console.log(`ngrok URL: ${publicUrl}`);

  next = spawn("pnpm", ["dev"], {
    env: {
      ...process.env,
      BETTER_AUTH_URL: publicUrl,
      PORT: port,
    },
    stdio: "inherit",
  });

  next.on("exit", (code, signal) => {
    if (!shuttingDown) {
      shutdown(signal ?? "SIGTERM");
    }

    process.exit(code ?? 1);
  });
} catch (error) {
  shutdown("SIGTERM");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
