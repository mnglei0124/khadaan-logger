"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/login"];
  const showSidebar = !noSidebarRoutes.includes(pathname || "");

  return (
    <div className="flex min-h-screen bg-stone-100">
      {showSidebar && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
