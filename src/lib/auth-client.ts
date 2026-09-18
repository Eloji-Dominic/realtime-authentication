import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      // twoFactorPage: "/two-factor",
      onTwoFactorRedirect(){
        redirect("/two-factor")
      }
    }),
  ],
});

// export const { signIn, signUp, useSession } = createAuthClient()
