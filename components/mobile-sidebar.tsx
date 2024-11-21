"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./logo";
import { routes } from "./sidebar-route";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute = 
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon/>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4" side={"left"}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant: 
                    activeRoute.href === route.href
                      ? "sidebarActiveItem"
                      : "sidebarItem",
                  })}
                  onClick={() => setIsOpen((prev) => !prev) }
                >
                <route.icon size={"20"} />
                {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
    
export default MobileSidebar;