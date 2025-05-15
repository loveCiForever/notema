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
    Bot,
    Video,
    Database,
    FileText,
    PaintBucket,
    MoreVertical,
} from "lucide-react";

const NotePageContent = () => {
    const { id } = useParams();
    // console.log("Note ID:", id);
    const isDark = useTheme();

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

            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
                {/* Action buttons */}
                <div className="flex items-center gap-4 mb-4 text-zinc-400">
                    <button className="flex items-center gap-2 hover:text-zinc-500">
                        <Smile className="w-5 h-5" />
                        <span>Add icon</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-zinc-500">
                        <ImageIcon className="w-5 h-5" />
                        <span>Add cover</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-zinc-500">
                        <MessageCircle className="w-5 h-5" />
                        <span>Add comment</span>
                    </button>
                </div>

                {/* Page title with cursor */}
                <div className="mt-4 mb-20 relative">
                    <h1 className="text-5xl font-bold text-zinc-200">New page</h1>
                </div>

            </main>

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
