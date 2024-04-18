"use client";

import { Gift, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

export default function NewGiftForm({ columnId }: { columnId: string }) {
    const addGift = useMutation(
        ({ storage }, giftName) => {
            return storage.get("gifts").push(
                new LiveObject<Gift>({
                    name: giftName,
                    id: uniqid.time(),
                    columnId: columnId,
                    index: 9999,
                })
            );
        },
        [columnId]
    );

    function handleNewGiftFormSubmit(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            const giftName = input?.value;
            addGift(giftName);
            input.value = "";
        }
    }
    return (
        <form onSubmit={handleNewGiftFormSubmit}>
            <input type="text" placeholder="gift name" />
        </form>
    );
}
