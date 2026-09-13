"use client"

import FormLayout from "@/components/Layout/FormLayout";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

// ✅ Schema
const formSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
});

type FormData = z.infer<typeof formSchema>;

function ForgetPassWordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleForgetPassword(data: FormData) {
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error("We couldn't send reset link");
      return;
    }

    setSent(true);
  }

  return (
    <FormLayout
      title="Forgot password"
      subTitle="Enter your email to receive a reset link"
    >
      {/* Success State */}
      {sent ? (
        <div className="text-center space-y-4">
          <p className="text-green-400 text-sm">
            ✅ Reset link sent! Check your email.
          </p>
          <a
            href="/login"
            className="text-teal-400 hover:text-teal-300 text-sm"
          >
            Back to login
          </a>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={handleSubmit(handleForgetPassword)}
        >
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-teal-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      {/* Footer */}
      <p className="text-sm text-gray-400 text-center mt-6">
        Remember your password?{" "}
        <Link href="/sign-in" className="text-teal-400 hover:text-teal-300">
          Sign in
        </Link>
      </p>
    </FormLayout>
  );
}

export default ForgetPassWordPage;