import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import {
    ChevronDown,
    Lock,
    MessageSquare,
    Star,
    MoreHorizontal,
    Smile,
    ImageIcon,
    MessageCircle,
} from "lucide-react";
import React from "react";
import EditorComponent from "../components/editor/EditorComponent";
import useEditor from "../hooks/useEditor";

const NotePageContent = () => {
    const { id } = useParams();
    // console.log("Note ID:", id);
    const isDark = useTheme();
    const { content, status, onChange } = useEditor(id);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-medium text-zinc-800">New page</h1>
                    <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100 cursor-pointer">
                        <Lock className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-400 text-sm">Private</span>
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded hover:bg-zinc-100 font-medium">
                        Share
                    </button>
                    <button className="p-2 rounded hover:bg-zinc-100">
                        <MessageSquare className="w-5 h-5 text-zinc-500" />
                    </button>
                    <button className="p-2 rounded hover:bg-zinc-100">
                        <Star className="w-5 h-5 text-zinc-500" />
                    </button>
                    <button className="p-2 rounded hover:bg-zinc-100">
                        <MoreHorizontal className="w-5 h-5 text-zinc-500" />
                    </button>
                </div>
            </header>

            <div className="editor-wrapper">
                {content && <EditorComponent data={content} onChange={onChange} />}
            </div>
            <div className="save-status">{status}</div>
        </div>
    );
};

const NotePage = () => {
    return (
        <ThemeProvider>
            <NotePageContent />
        </ThemeProvider>
    );
};

export default NotePage;
