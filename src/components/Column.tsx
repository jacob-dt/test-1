import { ReactSortable } from "react-sortablejs";
import { shallow } from "@liveblocks/client";
import GiftCreationForm from "./forms/GiftCreationForm";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { default as ColumnGift } from "@/components/Gift";
import { Gift, useMutation, useStorage } from "@/app/liveblocks.config";

type ColumnProps = {
    id: string;
    name: string;
};

export default function Column({ id, name }: ColumnProps) {
    const [columnRename, setColumnRename] = useState(false);

    const columnGifts = useStorage<Gift[]>((root) => {
        return root.gifts
            .filter((gift) => gift.columnId === id)
            .map((g) => ({ ...g }))
            .sort((a, b) => a.index - b.index);
    }, shallow);

    const updateGift = useMutation(({ storage }, index, updateData) => {
        const gift = storage.get("gifts").get(index);
        if (gift) {
            for (let key in updateData) {
                gift?.set(key as keyof Gift, updateData[key]);
            }
        }
    }, []);

    const updateColumn = useMutation(({ storage }, id, newName) => {
        const columns = storage.get("columns");
        columns
            .find((column) => column.toObject().id === id)
            ?.set("name", newName);
    }, []);

    const deleteColumn = useMutation(({ storage }, id) => {
        const columns = storage.get("columns");
        const columnIndex = columns.findIndex(
            (column) => column.toObject().id === id
        );
        columns.delete(columnIndex);
    }, []);

    const setGiftsOrderForColumn = useMutation(
        ({ storage }, sortedGifts: Gift[], newColumnId) => {
            const idsOfSortedGifts = sortedGifts.map((g) => g.id.toString());
            const allGifts: Gift[] = [
                ...storage.get("gifts").map((g) => g.toObject()),
            ];
            idsOfSortedGifts.forEach((sortedGiftId, colIndex) => {
                const giftStorageIndex = allGifts.findIndex(
                    (g) => g.id.toString() === sortedGiftId
                );
                updateGift(giftStorageIndex, {
                    columnId: newColumnId,
                    index: colIndex,
                });
            });
        },
        []
    );

    function columnRenameHandler(event: FormEvent) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector("input");
        if (input) {
            const newColumnName = input.value;
            updateColumn(id, newColumnName);
            setColumnRename(false);
        }
    }

    return (
        <div className="w-48 bg-zinc-800 rounded-lg p-2">
            {!columnRename && (
                <div className="flex justify-between">
                    <h3>{name}</h3>
                    <button onClick={() => setColumnRename(true)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            )}
            {columnRename && (
                <div className="mb-8">
                    Change Name:
                    <form onSubmit={columnRenameHandler} className="mb-2">
                        <input type="text" defaultValue={name} />
                        <button type="submit" className="w-full mt-2">
                            Save
                        </button>
                    </form>
                    <button
                        onClick={() => deleteColumn(id)}
                        className="flex gap-2 items-center bg-red-600 py-2 px-4 rounded-lg w-full justify-center"
                    >
                        <FontAwesomeIcon icon={faX} />
                        Delete
                    </button>
                    <button
                        onClick={() => setColumnRename(false)}
                        className="flex gap-2 items-center bg-zinc-600 py-2 px-4 rounded-lg w-full justify-center mt-2"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {!columnRename && columnGifts && (
                <>
                    <ReactSortable
                        list={columnGifts}
                        setList={(items) => setGiftsOrderForColumn(items, id)}
                        group="gifts"
                        className="min-h-20"
                        ghostClass="opacity-50"
                    >
                        {columnGifts.map((gift) => (
                            <ColumnGift
                                key={gift.id}
                                id={gift.id}
                                name={gift.name}
                            />
                        ))}
                    </ReactSortable>
                </>
            )}
            {!columnRename && <GiftCreationForm columnId={id} />}
        </div>
    );
}
