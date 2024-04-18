"use client";

import { redirect } from "next/navigation";
import { createRegistry } from "../actions/registryActions";

export default function NewRegistryPage() {
    async function handleNewRegistrySubmit(formData: FormData) {
        const registryInfo = await createRegistry(
            formData.get("name")?.toString() || ""
        );
        if (registryInfo) {
            redirect(`/registries/${registryInfo.id}`);
        }
    }
    return (
        <div>
            <form action={handleNewRegistrySubmit} className="max-w-xs block">
                <h1 className="text-2xl mb-3">Create New Registry</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Registry Name"
                    className="bg-zinc-800
                    text-white
                    caret-white"
                />
                <button type="submit" className="mt-3 w-full">
                    Create Registry
                </button>
            </form>
        </div>
    );
}
