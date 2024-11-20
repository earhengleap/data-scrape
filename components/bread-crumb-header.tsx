"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = React.useMemo(
    () => (pathName === "/" ? [""] : pathName.split("/")),
    [pathName]
  );

  return (
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
  );
};

export default BreadcrumbHeader;
