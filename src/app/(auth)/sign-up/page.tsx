"use client"

import FormLayout from "@/components/Layout/FormLayout";
import Link from "next/link";
import { FaGithub } from "react-icons/fa"
import z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signInWithGitHub } from "@/lib/auth-social";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    email: z.email({
      message: "Enter a valid email",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const router = useRouter();
  type FormData = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const handleSignUp = async (data: FormData) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password
    });

    if(error){
      toast.error("Registration was not successful");
      return;
    }

    toast.success("Registration was successful");
    router.push("/sign-in");
  }

  return (
    <FormLayout title="Create an account" subTitle="Sign up to get started">
      <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="John Doe"
            className={`rounded-lg w-full bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-gray-700 focus:ring-teal-500 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-teal-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className={`rounded-lg w-full bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-gray-700 focus:ring-teal-500 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-teal-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="********"
            className={`rounded-lg w-full bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-gray-700 focus:ring-teal-500 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-teal-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="block text-sm text-gray-300 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="********"
            className={`rounded-lg w-full bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-gray-700 focus:ring-teal-500`}
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <div className="w-full p-5">
          {/* <button
            // onClick={handleGoogleSignin}
            type="button"
            className="cursor-pointer flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm"
          >
            <FaLinkedin className="w-5 h-5" />
            LinkedIn
          </button> */}

          <button
            onClick={signInWithGitHub}
            type="button"
            className="cursor-pointer flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm"
          >
            <FaGithub className="w-5 h-5 text-white" />
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-teal-400 hover:text-teal-300">
            Sign in
          </Link>
        </p>
      </form>
    </FormLayout>
  );
}
