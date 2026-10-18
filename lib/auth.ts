import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db"; // your prisma client instance
import { nextCookies } from "better-auth/next-js";

type GitHubProfile = {
  email?: string | null;
  id: string | number;
  login?: string | null;
  name?: string | null;
};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ...(process.env.BETTER_AUTH_URL
      ? [process.env.BETTER_AUTH_URL]
      : []),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,

      mapProfileUser: async (profile: GitHubProfile) => ({
        email: profile.email ?? `${profile.id}@no-reply.github.com`,
        name: profile.name ?? profile.login,
      }),
    },
  },

  plugins: [nextCookies()],
});
