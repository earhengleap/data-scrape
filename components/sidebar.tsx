"use client";

import Link from "next/link";
import Logo from "./logo";
import { routes } from "./sidebar-route";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    routes.find((route) =>
      route.href === "/" ? pathname === "/" : pathname.startsWith(route.href)
    ) || routes[0];

  return (
    <aside className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full dark:text-foreground text-muted-foreground border-r border-border/50">
      <div className="flex items-center justify-center gap-2 border-b border-border/50 p-4">
        <Logo />
      </div>
      <div className="px-4 py-2 text-xs text-muted-foreground">
        TODO CREDITS
      </div>
      <nav className="p-2 space-y-1">
        {routes.map((route) => (
          <div key={route.href}>
            <Link
              href={route.href}
              className={cn(
                buttonVariants({
                  variant:
                    activeRoute.href === route.href
                      ? "sidebarActiveItem"
                      : "sidebarItem",
                }),
                "w-full justify-start group transition-colors duration-200"
              )}
            >
              <route.icon
                className={cn(
                  "mr-2 h-4 w-4 transition-transform",
                  activeRoute.href === route.href
                    ? "scale-110"
                    : "group-hover:scale-110"
                )}
              />
              <span className="text-sm">{route.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
