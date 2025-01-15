"use client";

import { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Login attempt with:", { email, password });
  };

  return (
    <WavyBackground
      className="relative"
      colors={["#818cf8", "#c084fc", "#38bdf8"]}
      waveOpacity={0.2}
      blur={8}
      speed="slow"
    >
      <main className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
        <div className="w-full max-w-md p-8 space-y-8 text-center shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm sm:p-12">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text sm:text-5xl">
            Login
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Sign in to access your SCANUEV account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-full"
                required
              />
              <User
                className="absolute text-blue-500 transform -translate-y-1/2 left-3 top-1/2"
                size={18}
              />
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 rounded-full"
                required
              />
              <Lock
                className="absolute text-blue-500 transform -translate-y-1/2 left-3 top-1/2"
                size={18}
              />
            </div>
            <GradientButton type="submit">
              <span className="flex items-center justify-center">
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </GradientButton>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-transparent bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text hover:from-blue-600 hover:to-purple-700"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </main>
    </WavyBackground>
  );
}
