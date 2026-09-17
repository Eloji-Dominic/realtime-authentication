"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ToggleTwofactorProps {
  twofactorEnabled: boolean | undefined;
}

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ToggleTwoFactor({
  twofactorEnabled,
}: ToggleTwofactorProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleTwoFactorAuthentication(data: FormData) {
    try {
      if (twofactorEnabled) {
        const { error } = await authClient.twoFactor.disable({
          password: data.password,
        });

        if (error) {
          toast.error("We couldn't disable your two factor authentication");
          return;
        }

        toast.success("Two factor authentication disabled");
      } else {
        const { error } = await authClient.twoFactor.enable({
          password: data.password,
        });

        if (error) {
          toast.error("We couldn't enable your two factor authentication");
          return;
        }

        toast.success("Two factor authentication enabled");
      }

      setOpen(false);
      router.refresh(); // 🔥 important

    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg"
      >
        {twofactorEnabled ? "Disable Two-Factor" : "Enable Two-Factor"}
      </button>

      {/* Form (only shows when open) */}
      {open && (
        <form
          onSubmit={handleSubmit(handleTwoFactorAuthentication)}
          className="space-y-5 bg-gray-900 border border-gray-800 p-5 rounded-xl"
        >
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="********"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting
              ? twofactorEnabled
                ? "Disabling..."
                : "Enabling..."
              : twofactorEnabled
                ? "Confirm Disable"
                : "Confirm Enable"}
          </button>
        </form>
      )}
    </div>
  );
}
