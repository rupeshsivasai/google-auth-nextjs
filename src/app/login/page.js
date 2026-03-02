"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0b0b0f]">

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative w-[380px] rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mb-8 text-center text-sm text-zinc-400">
          Sign in to your account
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="
            group flex h-12 w-full items-center justify-center gap-3
            rounded-xl border border-white/10
            bg-white/10 text-sm font-medium text-white
            transition-all duration-300
            hover:bg-white/15 hover:border-white/20
          "
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={18}
            height={18}
            className="opacity-90"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          Secure authentication powered by Google
        </p>

      </div>
    </div>
  );
}
