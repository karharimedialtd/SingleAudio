import type { Metadata } from "next";
import React from "react";
import DashboardClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard for managing your account and settings.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
