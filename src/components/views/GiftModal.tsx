"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RegistryContext, RegistryContextProps } from "../RegistryContext";
import { Gift, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import VerifyDeletion from "../VerifyDeletion";
import PurchaseLink from "../PurchaseLinkSection";

export default function GiftModal() {
    const router = useRouter();
    const params = useParams();
    const { setOpenGift } = useContext<RegistryContextProps>(RegistryContext);
    const [giftEditor, setGiftEditor] = useState(false);

    const gift = useStorage((root) => {
        return root.gifts.find((g) => g.id === params.giftId);
    }, shallow);

    const giftUpdate = useMutation(({ storage }, giftId, updateGiftData) => {
        const gifts = storage.get("gifts").map((gift) => gift.toObject());
        const giftIndex = gifts.findIndex((gift) => gift.id === giftId);
        const gift = storage.get("gifts").get(giftIndex);

        for (let key in updateGiftData) {
            gift?.set(key as keyof Gift, updateGiftData[key]);
        }
    }, []);

    const giftDelete = useMutation(({ storage }, id) => {
        const gifts = storage.get("gifts");
        const giftIndex = gifts.findIndex((gift) => gift.toObject().id === id);
        gifts.delete(giftIndex);
    }, []);

    useEffect(() => {
        if (params.giftId && setOpenGift) {
            setOpenGift(params.giftId.toString());
        }
    }, [params]);

    function deleteHandler() {
        giftDelete(params.giftId);
        if (setOpenGift) {
            setOpenGift(null);
        }
        router.back();
    }

    function backgroundClickHandler() {
        router.back();
    }

    function giftNameChangeHandler(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            const newGiftName = input.value;
            giftUpdate(params.giftId, { name: newGiftName });
            setGiftEditor(false);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/70"
            onClick={backgroundClickHandler}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="bg-zinc-800 p-4 mt-8 max-w-sm mx-auto rounded-lg"
            >
                {!giftEditor && (
                    <div className="flex justify-between">
                        <h4 className="text-xl">{gift?.name}</h4>
                        <button onClick={() => setGiftEditor(true)}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                )}
                {giftEditor && (
                    <div>
                        <form onSubmit={giftNameChangeHandler}>
                            <input
                                type="text"
                                defaultValue={gift?.name}
                                className="mb-2"
                            />
                            <button type="submit" className="w-full">
                                Save
                            </button>
                        </form>
                        <div className="mt-2">
                            <VerifyDeletion onDelete={() => deleteHandler()} />
                        </div>
                    </div>
                )}
                {!giftEditor && (
                    <div>
                        <h2 className="flex mt-2 gap-2 items-center">
                            <FontAwesomeIcon icon={faMoneyBill1Wave} />
                            Purchase Here
                        </h2>
                        <PurchaseLink />
                    </div>
                )}
            </div>
        </div>
    );
}
