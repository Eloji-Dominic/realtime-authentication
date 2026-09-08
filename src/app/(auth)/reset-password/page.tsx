import FormLayout from '@/components/Layout/FormLayout';

function ResetPasswordPage() {
  return (
    <FormLayout title="Welcome back" subTitle="Sign in to your account">
      {/* Success State */}
      {/* {success ? (
        <div className="text-center space-y-4">
          <p className="text-green-400 text-sm">
            ✅ Password reset successfully!
          </p>
          <a
            href="/sign-in"
            className="text-teal-400 hover:text-teal-300 text-sm"
          >
            Back to login
          </a>
        </div>
      ) : ( */}
        <form className="space-y-5">
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Password
            </label>
            <input
              // {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
            />
            {/* {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )} */}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              // {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
            />
            {/* {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )} */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            // disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
          >
            {/* {isSubmitting ? "Resetting..." : "Reset Password"} */}
            Reset Password
          </button>
        </form>
      {/* )} */}

      {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Remember your password?{" "}
          <a href="/sign-in" className="text-teal-400 hover:text-teal-300">
            Sign in
          </a>
        </p>
    </FormLayout>
  );
}

export default ResetPasswordPage;
