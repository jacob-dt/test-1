"use client";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { removeUserFromRegistry } from "@/app/actions/registryActions";
import { useRouter } from "next/navigation";
import { RegistryContextProvider } from "./RegistryContext";

export default function Registry({ id, name }: { id: string; name: string }) {
    const [registryRename, setRegistryRename] = useState(false);

    const router = useRouter();
    async function renameRegistryHandler(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            const newRegistryName = input.value;
            await removeUserFromRegistry(id, {
                metadata: { registryName: newRegistryName },
            });
            input.value = "";
            setRegistryRename(false);
            router.refresh();
        }
    }

    return (
        <RegistryContextProvider>
            <RoomProvider
                id={id}
                initialPresence={{}}
                initialStorage={{
                    columns: new LiveList(),
                    gifts: new LiveList(),
                }}
            >
                <ClientSideSuspense fallback={<div>loading...</div>}>
                    {() => (
                        <>
                            <div className="flex gap-2 items-center mb-2 justify-between">
                                <div>
                                    {!registryRename && (
                                        <h1
                                            className="text-2xl"
                                            onClick={() =>
                                                setRegistryRename(true)
                                            }
                                        >
                                            {name}
                                        </h1>
                                    )}
                                    {registryRename && (
                                        <form onSubmit={renameRegistryHandler}>
                                            <input
                                                type="text"
                                                defaultValue={name}
                                            />
                                        </form>
                                    )}
                                </div>
                                <Link
                                    href={`/registries/${id}/settings`}
                                    className="flex gap-2 items-center"
                                >
                                    <FontAwesomeIcon icon={faCog} />
                                </Link>
                            </div>

                            <Columns />
                        </>
                    )}
                </ClientSideSuspense>
            </RoomProvider>
        </RegistryContextProvider>
    );
}
