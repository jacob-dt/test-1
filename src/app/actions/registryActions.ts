"use server";
import uniqid from "uniqid";
import { getServerSession } from "next-auth";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getLiveblocksClient, liveblocksClient } from "@/lib/liveblocksClient";
import { authorizationChoices } from "@/lib/authorizationChoices";

export async function addUserToRegistry(registryId: string, user: string) {
    const usersAccesses = (await liveblocksClient.getRoom(registryId))
        .usersAccesses;
    usersAccesses[user] = ["room:write"];
    await liveblocksClient.updateRoom(registryId, { usersAccesses });
    return true;
}

export async function removeUserFromRegistry(
    registryId: string,
    updateInfo: any
) {
    const result = await getLiveblocksClient().updateRoom(
        registryId,
        updateInfo
    );
    console.log(result);
    return true;
}

export async function removeEmailFromRegistry(
    registryId: string,
    user: string
) {
    const usersAccesses: any = (await liveblocksClient.getRoom(registryId))
        .usersAccesses;
    usersAccesses[user] = null;
    await liveblocksClient.updateRoom(registryId, { usersAccesses });
    return true;
}

export async function createRegistry(name: string): Promise<false | RoomInfo> {
    const liveblocksClient = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
    });
    const userEmail =
        (await getServerSession(authorizationChoices))?.user?.email || "";
    if (userEmail) {
        const roomId = uniqid.time();
        return await liveblocksClient.createRoom(roomId, {
            defaultAccesses: [],
            usersAccesses: {
                [userEmail]: ["room:write"],
            },
            metadata: {
                registryName: name,
            },
        });
    }
    return false;
}

export async function deleteRegistry(registryId: string) {
    await liveblocksClient.deleteRoom(registryId);
    return true;
}
