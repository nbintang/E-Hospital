"use client";

import { Footer } from "@/components/admin/admin-panel/footer";
import { Sidebar } from "@/components/admin/admin-panel/navigations/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[100vh] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        {children}
      </main>
     
    </>
  );
}
