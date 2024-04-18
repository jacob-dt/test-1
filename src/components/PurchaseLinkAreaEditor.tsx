import LiveblocksProvider from "@liveblocks/yjs";
import { Doc } from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { useSelf } from "@/app/liveblocks.config";
import { Link } from "@tiptap/extension-link";

type LinkAreaProps = {
    document: Doc;
    provider: LiveblocksProvider<any, any, any, any>;
    giftId: string;
};

export default function PurchaseLinkAreaEditor({
    document,
    provider,
    giftId,
}: LinkAreaProps) {
    const userInfo = useSelf((me) => me.info);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Placeholder.configure({
                emptyEditorClass: "is-editor-empty",
                placeholder: "Purchase Link...",
            }),
            Collaboration.configure({
                document: document,
                field: giftId,
            }),
            CollaborationCursor.configure({
                provider,
                user: userInfo || undefined,
            }),
            Link.configure({ openOnClick: true }),
        ],
    });

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
}
