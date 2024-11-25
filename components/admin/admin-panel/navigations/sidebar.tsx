"use client";
import { Menu } from "@/components/admin/admin-panel/navigations/menu";
import { SidebarToggle } from "@/components/admin/admin-panel/navigations/sidebar-toggle";
import Company from "@/components/icons/company";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Company className="h-8 w-8" />
            <div
  className={cn(
    "flex flex-col justify-start transition-[transform,opacity] ease-in-out duration-300",
    !getOpenState()
      ? "-translate-x-96 opacity-0 hidden"
      : "translate-x-0 opacity-100"
  )}
>
  <h1
    className={cn(
      "font-bold text-base text-fusion-red whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300"
    )}
  >
    Rumah Sakit
  </h1>
  <p className="text-sm text-soft-clean-pool p-0 whitespace-nowrap">
    Inovasi
  </p>
</div>



          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
