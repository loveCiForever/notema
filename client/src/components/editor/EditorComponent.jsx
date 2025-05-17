import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from '@editorjs/paragraph';

export default function EditorComponent({ data, onChange }) {
    const editorRef = useRef(null);

    useEffect(() => {
        // Chỉ khởi tạo once với holder là ID
        const holderId = "editorjs";
        editorRef.current = new EditorJS({
            holder: holderId,
            data,
            onReady: () => console.log("Editor.js is ready"),
            onChange: async () => {
                console.log("[EditorComponent] onChange fired");
                const savedData = await editorRef.current.save();
                console.log("[EditorComponent] savedData =", savedData);
                onChange(savedData);
            },
            tools: {
                header: Header,
                list: List,
                paragraph: Paragraph,
                image: {
                    class: ImageTool,
                    config: { endpoints: { byFile: "/api/upload" } },
                },
            },
        });

        editorRef.current.isReady.then(() => {
            // Mỗi khi nội dung thay đổi (gồm cả typing), event này sẽ chạy
            editorRef.current.events.on('change', async () => {
                console.log('[EditorComponent] change event');  // để debug
                const savedData = await editorRef.current.save();
                onChange(savedData);
            });
        });

        return () => {
            if (
                editorRef.current &&
                typeof editorRef.current.destroy === "function"
            ) {
                editorRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            // Chỉ render sau khi editor sẵn sàng
            editorRef.current.isReady
                .then(() => editorRef.current.render(data))
                .catch(console.error);
        }
    }, [data]);

    return (
        <div
            className="bg-black"
            id="editorjs"
            style={{ minHeight: "300px", background: "white", padding: "1rem" }}
        />
    );
}
