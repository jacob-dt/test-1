"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="bg-zinc-900 ml-2 px-4 py-2 rounded-lg inline-flex gap-2 items-center"
        >
            Logout
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
    );
}
