"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./logo";
import { routes } from "./sidebar-route";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";


const DesktopSidebar = () => {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full dark:text-foreground text-muted-foreground border-r border-border/50"
    >
      <div className="flex items-center justify-center gap-2 border-b border-border/50 p-4">
        <Logo />
      </div>
      <div className="px-4 py-2 text-xs text-muted-foreground">
        TODO CREDITS
      </div>
      <motion.nav initial="hidden" animate="visible" className="p-2 space-y-1">
        {routes.map((route, index) => (
          <motion.div
            key={route.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.1,
              type: "tween",
            }}
          >
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
          </motion.div>
        ))}
      </motion.nav>
    </motion.aside>
  );
};

export default DesktopSidebar;
