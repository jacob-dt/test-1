"use server";
import { liveblocksClient } from "@/lib/liveblocksClient";
import DeleteRegistryButton from "@/components/DeleteRegistryButton";
import UserAccessList from "@/components/UserAccessList";
import RegistryAccess from "@/components/forms/RegistryAccess";
import Link from "next/link";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
    params: {
        registryId: string;
    };
};

export default async function RegistrySettings({ params }: PageProps) {
    const { registryId } = params;
    const registryInfo = await liveblocksClient.getRoom(registryId);
    const userEmail = await getUserEmail();
    if (!registryInfo.usersAccesses[userEmail]) {
        return "Not Logged In";
    }
    return (
        <div>
            <div className="flex justify-between">
                <Link
                    href={`/registries/${registryId}`}
                    className="inline-flex gap-2 items-center btn mb-4"
                >
                    Go Back
                </Link>
                <DeleteRegistryButton registryId={registryId} />
            </div>

            <h1 className="text-2xl">Access to Registry:</h1>
            <div className="mb-10">
                <UserAccessList
                    registryId={registryId}
                    usersAccesses={registryInfo.usersAccesses}
                />
            </div>

            <RegistryAccess registryId={registryId} />
        </div>
    );
}
