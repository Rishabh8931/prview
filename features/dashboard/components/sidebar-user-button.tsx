"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserMenu, UserMenuUser } from "@/features/auth/components/user-menu";

type SidebarUserButtonProps = {
  user: UserMenuUser;
  plan?: string;
};

export function SidebarUserButton({ user, plan }: SidebarUserButtonProps) {
  const { state } = useSidebar();
  const triggerClassName =
    state === "collapsed"
      ? "mx-auto size-8 rounded-full"
      : "w-full [&_button]:h-12 [&_button]:w-full [&_button]:justify-start [&_button]:gap-2 [&_button]:px-2";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu
          user={user}
          plan={plan}
          variant={state === "collapsed" ? "compact" : "profile"}
          className={triggerClassName}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
