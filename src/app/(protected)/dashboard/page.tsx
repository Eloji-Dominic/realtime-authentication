"use client";

import LoadingScreen from "@/components/loading/LoadingScreen";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage(){
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return <LoadingScreen />
  }

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* User Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl py-12 px-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-lg font-semibold">
              {session?.user.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-medium">{session?.user.name}</h2>
              <p className="text-gray-400 text-sm">{session?.user.email}</p>
            </div>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            {/* <div>
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div> */}

            {/* Status Badge */}
            {/* <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                is2FAEnabled
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {is2FAEnabled ? "Enabled" : "Disabled"}
            </span> */}
          </div>

          {/* Toggle Component */}
          {/* {session && (
            <ToggleTwoFactor
              twofactorEnabled={session?.user.twoFactorEnabled ?? undefined}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};