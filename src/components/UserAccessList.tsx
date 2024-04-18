"use client";
import {
    deleteRegistry,
    removeEmailFromRegistry,
} from "@/app/actions/registryActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

export default function UserAccessList({
    registryId,
    usersAccesses,
}: {
    registryId: string;
    usersAccesses: RoomAccesses;
}) {
    const router = useRouter();
    async function deleteUser(emailToDelete: string) {
        await removeEmailFromRegistry(registryId, emailToDelete);
        router.refresh();
    }
    return (
        <div className="max-w-sm rounded-lg">
            {Object.keys(usersAccesses).map((email) => (
                <div
                    key={email}
                    className="flex gap-3 my-5 items-center max-w-sm justify-between bg-zinc-800 pl-2 rounded-lg"
                >
                    {email}
                    <button className="btn" onClick={() => deleteUser(email)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}
        </div>
    );
}
