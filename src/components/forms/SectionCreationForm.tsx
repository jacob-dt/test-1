"use client";

import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

export default function SectionCreationForm() {
    const addSection = useMutation(({ storage }, sectionName) => {
        return storage.get("columns").push(
            new LiveObject({
                name: sectionName,
                id: uniqid.time(),
                index: 9999,
            })
        );
    }, []);

    function newSectionHandler(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            addSection(input?.value);
            input.value = "";
        }
    }

    return (
        <form onSubmit={newSectionHandler} className="max-w-xs">
            <label className="block">
                <span className="block">Section Name:</span>
                <input
                    type="text"
                    placeholder='"buy", "purchased", "save for later"'
                    className="bg-zinc-800 caret-white"
                />
            </label>
            <button type="submit" className="mt-2 block w-full">
                Add Section
            </button>
        </form>
    );
}
