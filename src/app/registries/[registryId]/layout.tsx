"use client";

import { RegistryContextProvider } from "@/components/RegistryContext";
import { LiveList } from "@liveblocks/client";
import { useParams } from "next/navigation";
import React from "react";
import { RoomProvider } from "@/app/liveblocks.config";

type PageProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
};

export default function RegistryLayout({ children, modal }: PageProps) {
    return (
        <RegistryContextProvider>
            <RoomProvider
                id={useParams().registryId.toString()}
                initialPresence={{}}
                initialStorage={{
                    columns: new LiveList(),
                    gifts: new LiveList(),
                }}
            >
                {children}
                {modal}
            </RoomProvider>
        </RegistryContextProvider>
    );
}
