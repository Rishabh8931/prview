import { requireUnAuth } from "@/features/auth/actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md ">{children}</div>
    </div>
  );
}
