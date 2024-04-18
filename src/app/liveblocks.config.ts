import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
    throttle: 100,
});

type Presence = {};

export type Column = {
    name: string;
    id: string;
    index: number;
};

export type Gift = {
    name: string;
    id: string;
    index: number;
    columnId: string;
};

type Storage = {
    columns: LiveList<LiveObject<Column>>;
    gifts: LiveList<LiveObject<Gift>>;
};

export const {
    RoomProvider,
    useMyPresence,
    useStorage,
    useMutation,
    useRoom,
    useSelf,
    useOthers,
} = createRoomContext<Presence, Storage>(client);
