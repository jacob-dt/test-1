"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { RegistryContext } from "./RegistryContext";

export default function Gift({ id, name }: { id: string; name: string }) {
    const params = useParams();
    const router = useRouter();
    const { openGift } = useContext(RegistryContext);

    useEffect(() => {
        if (params.giftId && !openGift) {
            const { registryId, giftId } = params;
            router.push(`/registries/${registryId}`);
            router.push(`/registries/${registryId}/gifts/${giftId}`);
        }
        if (!params.giftId && openGift) {
            router.push(`/registries/${params.registryId}`);
        }
    }, [params.giftId]);

    return (
        <Link
            href={`/registries/${params.registryId}/gifts/${id}`}
            className="border-zinc-950 border my-2 p-4 rounded-lg block"
        >
            <span>{name}</span>
        </Link>
    );
}
