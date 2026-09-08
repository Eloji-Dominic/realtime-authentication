import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // your prisma client instance
import { resend } from "./resend";
import VerifyEmail from "@/components/emails/Verify-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({user, url}) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME!} <${process.env.EMAIL_SENDER_ADDRESS!}>`,
        to: "zdtslu8234@minitts.net",
        subject: "Verify your email",
        react: VerifyEmail({ username: user.name, verifyURL: url }),
      });
    },
  }
});

// export const auth = betterAuth({
  //...other options
  // emailAndPassword: { 
  //   enabled: true, 
  // }, 
//   socialProviders: { 
//     github: { 
//       clientId: process.env.GITHUB_CLIENT_ID as string, 
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
//     }, 
//   }, 
// });
