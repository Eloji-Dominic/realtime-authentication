"use client";

import FormLayout from "@/components/Layout/FormLayout";
import { FaGithub } from "react-icons/fa"
import Link from "next/link";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { signInWithGitHub } from "@/lib/auth-social";

const formSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export default function SignInPage() {
  const router = useRouter();
  type FormData = z.infer<typeof formSchema>
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  
  const handleSignIn = async (data: FormData) => {
    const { error } = await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        async onSuccess(context) {
          if (context.data.twoFactorRedirect) {
            await authClient.twoFactor.sendOtp({});
            router.push("/two-factor");
          } else {
            toast.success("Logged in successfully!");
            router.push("/dashboard");
          }
        },
      },
    );

    if(error){
      toast.error(error.message as string);
      return;
    }

    toast.success("Signin was successful");
    router.push("/dashboard");
  }

  return (
    <FormLayout title="Welcome back" subTitle="Sign in to your account">
      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(handleSignIn)}>
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            {...register("email")}
            type="text"
            placeholder="you@example.com"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="********"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link
            href="/forget-password"
            className="text-sm text-teal-400 hover:text-teal-300"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* Social Auth */}
      <div className="w-full p-5">
        {/* Google */}
        {/* <button
          // onClick={handleGoogleSignin}
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm"
        >
          <FaLinkedin className="w-5 h-5" />
          LinkedIn
        </button> */}

        {/* GitHub */}
        <button
          onClick={signInWithGitHub}
          type="button"
          className="flex items-center cursor-pointer justify-center gap-2 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm w-full"
        >
          <FaGithub className="w-5 h-5 text-white" />
          GitHub
        </button>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-400 text-center mt-6">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="text-teal-400 hover:text-teal-300">
          Sign up
        </a>
      </p>
    </FormLayout>
  );
}
