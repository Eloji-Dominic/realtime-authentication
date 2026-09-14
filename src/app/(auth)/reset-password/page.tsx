"use client"
import FormLayout from '@/components/Layout/FormLayout';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

// ✅ Schema
const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

function ResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleResetPassword(data: FormData) {
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });

    if (error) {
      toast.error("We couldn't update your password");
      return;
    }

    setSuccess(true);
  }

  return (
    <FormLayout title="Reset password" subTitle="Enter your new password">
      {/* Success State */}
      {success ? (
        <div className="text-center space-y-4">
          <p className="text-green-400 text-sm">
            ✅ Password reset successfully!
          </p>
          <Link
            href="/sign-in"
            className="text-teal-400 hover:text-teal-300 text-sm"
          >
            Back to login
          </Link>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-teal-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-teal-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
