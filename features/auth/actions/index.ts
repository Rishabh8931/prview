"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGithub(formData: FormData) {
  const callbackUrl = formData.get("callbackUrl") as string | undefined;

  // todoo: fix callback later
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
    },

    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}
