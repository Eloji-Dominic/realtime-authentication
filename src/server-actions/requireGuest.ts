"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireGuest() {
  const currentUser = await getCurrentUser();

  // user not logged in → allow access
  if (!currentUser?.id) {
    return null;
  }

  
  // logged in and fully onboarded
  redirect("/dashboard");
}