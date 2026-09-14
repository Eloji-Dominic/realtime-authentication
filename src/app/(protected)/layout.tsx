import { requireAuth } from "@/server-actions/requireAuth";
import React from "react";

export default async function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth();
  return <>{children}</>;
}
