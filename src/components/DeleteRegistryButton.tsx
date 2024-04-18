"use client";
import { deleteRegistry } from "@/app/actions/registryActions";
import { useRouter } from "next/navigation";

export default function DeleteRegistryButton({
    registryId,
}: {
    registryId: string;
}) {
    const router = useRouter();
    async function RegistryDeleteHandler() {
        await deleteRegistry(registryId);
        router.push("/");
    }

    return (
        <div>
            <button
                onClick={() => RegistryDeleteHandler()}
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
            >
                Delete Registry
            </button>
        </div>
    );
}
