"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            onClick={() => signIn("google")}
            className="bg-zinc-900 ml-2 px-4 py-2 rounded-lg"
        >
            Sign In
        </button>
    );
}
