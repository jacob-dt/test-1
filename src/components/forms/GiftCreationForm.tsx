"use client";

import { FormEvent } from "react";
import { LiveObject } from "@liveblocks/client";
import uniqid from "uniqid";
import { Gift, useMutation } from "@/app/liveblocks.config";

export default function GiftCreationForm({ columnId }: { columnId: string }) {
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

    function giftFormSubmitHandler(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            const giftName = input?.value;
            addGift(giftName);
            input.value = "";
        }
    }

    return (
        <form onSubmit={giftFormSubmitHandler}>
            <input type="text" placeholder="gift name" />
        </form>
    );
}
