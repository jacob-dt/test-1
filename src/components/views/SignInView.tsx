"use client";

import { signIn } from "next-auth/react";

export default function SignInView() {
    return (
        <div className="pt-8 text-center ">
            <button
                onClick={() => signIn("google")}
                className="py-2 px-20 bg-indigo-800 rounded-lg"
            >
                Sign In
            </button>
        </div>
    );
}
