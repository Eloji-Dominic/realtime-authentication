"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="relative">
          <div className="w-14 h-14 border-4 border-gray-800 rounded-full"></div>
          <div className="w-14 h-14 border-4 border-t-teal-500 border-r-teal-500 border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-white text-lg font-medium">
            Loading...
          </p>
          <p className="text-gray-400 text-sm">
            Please wait a moment
          </p>
        </div>

      </div>
    </div>
  );
}