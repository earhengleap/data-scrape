"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import React from "react";
import MobileSidebar from "./mobile-sidebar";


const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? [""] : pathName?.split("/");

  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink className="capitalize" href={`/${path}`}>
              {path === "" ? "home" : path}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
