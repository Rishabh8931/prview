import { requireAuth } from "@/features/auth/actions";
import { getInstallationStatus } from "@/features/github/server/installation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - GitHub",
  description: "GitHub integration dashboard",
};

const DashboardGithubPage = async () => {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  return <div>page</div>;
};

export default DashboardGithubPage;
