import { NextRequest } from "next/server";
import { Liveblocks } from "@liveblocks/node";

export async function PUT(req: NextRequest) {
    const { id, update } = await req.json();
    const lb = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
    });
    console.log({ id, update });
    await lb.updateRoom(id, update);
    return Response.json(true);
}
