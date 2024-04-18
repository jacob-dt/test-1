"use client";
import { Column, useMutation, useStorage } from "@/app/liveblocks.config";
import { ReactSortable } from "react-sortablejs";
import { default as RegistryColumn } from "@/components/Columns";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import SectionCreationForm from "./forms/SectionCreationForm";

export default function Columns() {
    const columns = useStorage(
        (root) => root.columns.map((column) => ({ ...column })),
        shallow
    );

    const updateColumns = useMutation(
        ({ storage }, columns: LiveObject<Column>[]) => {
            storage.set("columns", new LiveList(columns));
        },
        []
    );

    function setColumnsOrder(sortedColumns: Column[]) {
        const newColumns: LiveObject<Column>[] = [];
        sortedColumns.forEach((sortedColumn, newIndex) => {
            const newSortedColumn = { ...sortedColumn };
            newSortedColumn.index = newIndex;
            newColumns.push(new LiveObject(newSortedColumn));
        });
        updateColumns(newColumns);
    }

    if (!columns) {
        return;
    }

    return (
        <div className="flex gap-4">
            <ReactSortable
                list={columns}
                setList={setColumnsOrder}
                group={"registry-column"}
                className="flex gap-4"
                ghostClass="opacity-40"
            >
                {columns?.length > 0 &&
                    columns.map((column) => (
                        <RegistryColumn key={column.id} {...column} />
                    ))}
            </ReactSortable>

            <SectionCreationForm />
        </div>
    );
}
