"use client";

import { addUserToRegistry } from "@/app/actions/registryActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function RegistryAccess({ registryId }: { registryId: string }) {
    const router = useRouter();
    const inputReference = useRef<HTMLInputElement>(null);
    async function addUser(formData: FormData) {
        await addUserToRegistry(
            registryId,
            formData.get("email")?.toString() || ""
        );
        if (inputReference.current) {
            inputReference.current.value = "";
        }
        router.refresh();
    }
    return (
        <form action={addUser} className="max-w-xs">
            <h2>Add User:</h2>
            <input
                ref={inputReference}
                type="text"
                placeholder="username@email.com"
                name="email"
            />
            <button type="submit" className="mt-2">
                Save
            </button>
        </form>
    );
}
