"use client";

type Props = {
    onDelete: () => void;
};
export default function VerifyDeletion({ onDelete }: Props) {
    return (
        <button className="bg-red-600 p-2 w-full rounded-lg" onClick={onDelete}>
            Delete
        </button>
    );
}
