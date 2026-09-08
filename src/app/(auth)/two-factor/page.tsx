import FormLayout from "@/components/Layout/FormLayout";

export default function twoFactorPage(){
  return (
    <FormLayout
      title=" Two-Factor Verification"
      subTitle="Enter the 6-digit OTP code"
    >
      {/* Success State */}

      <form className="space-y-5">
        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Verification Code
          </label>
          <input
            // {...register("code")}
            type="text"
            placeholder="123456"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
          />
          {/* {errors.code && (
            <p className="text-red-400 text-xs mt-1">{errors.code.message}</p>
          )} */}
        </div>

        {/* Submit */}
        <button
          type="submit"
          // disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70"
        >
          {/* {isSubmitting ? "Verifying..." : "Verify Code"} */}
          Verify code
        </button>
      </form>
    </FormLayout>
  );
}