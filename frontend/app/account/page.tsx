"use client";

import { GradientButton } from "@/components/ui/gradient-button";
import { User } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function AccountPage() {
  return (
    <WavyBackground
      className="relative"
      colors={["#c084fc", "#38bdf8", "#818cf8"]}
      waveOpacity={0.25}
      blur={12}
    >
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-8 rounded-3xl bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm sm:p-12">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <User className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Your Account
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Manage your SCANUEV account settings and preferences
          </p>

          <div className="flex justify-center gap-4">
            <GradientButton>Update Profile</GradientButton>
            <GradientButton className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              Sign Out
            </GradientButton>
          </div>
        </div>
      </main>
    </WavyBackground>
  );
}
