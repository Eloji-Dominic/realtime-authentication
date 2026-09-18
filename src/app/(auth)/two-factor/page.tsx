"use client"

import FormLayout from "@/components/Layout/FormLayout";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

// ✅ Schema
const formSchema = z.object({
  code: z
  .string()
  .min(6, {
    message: "Code must be at least 6 characters",
  })
  .max(6, {
    message: "Code must be at most 6 characters",
  }),
});

type FormData = z.infer<typeof formSchema>

export default function TwoFactorPage(){
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function handleTwoFactorCode(data: FormData) {
    const { error } = await authClient.twoFactor.verifyOtp({
      code: data.code,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }

    toast.success("Login successful");
    router.push("/dashboard");
  }


  return (
    <FormLayout
      title=" Two-Factor Verification"
      subTitle="Enter the 6-digit OTP code"
    >
      {/* Success State */}

      <form className="space-y-5" onSubmit={handleSubmit(handleTwoFactorCode)}>
        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Verification Code
          </label>
          <input
            {...register("code")}
            type="text"
            placeholder="123456"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
          />
          {errors.code && (
            <p className="text-red-400 text-xs mt-1">{errors.code.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </FormLayout>
  );
}