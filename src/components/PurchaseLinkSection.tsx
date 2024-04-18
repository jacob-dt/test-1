import { useRoom } from "@/app/liveblocks.config";
import LiveblocksProvider from "@liveblocks/yjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Doc } from "yjs";
import PurchaseLinkAreaEditor from "./PurchaseLinkAreaEditor";

export default function PurchaseLink() {
    const { giftId } = useParams();
    const room = useRoom();

    const [document, setDocument] = useState<Doc | null>(null);

    const [provider, setProvider] = useState<LiveblocksProvider<
        any,
        any,
        any,
        any
    > | null>(null);

    useEffect(() => {
        const yDoc = new Doc();
        const yProvider = new LiveblocksProvider(room, yDoc);

        setDocument(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc.destroy();
            yProvider.destroy();
        };
    }, [room]);

    if (!document || !provider) {
        return null;
    }

    return (
        <div>
            <PurchaseLinkAreaEditor
                document={document}
                provider={provider}
                giftId={giftId.toString()}
            />
        </div>
    );
}
