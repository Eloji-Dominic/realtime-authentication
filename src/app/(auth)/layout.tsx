import { requireGuest } from "@/server-actions/requireGuest";
import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireGuest();
  return <>{children}</>;
}
