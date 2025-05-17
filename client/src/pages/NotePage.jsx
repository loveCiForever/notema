"use client"
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { ChevronDown, Lock, MessageSquare, Star, MoreHorizontal, Smile, ImageIcon, MessageCircle } from 'lucide-react';
import React from "react";
import EditorComponent from "../components/editor/EditorComponent";
import useEditor from "../hooks/useEditor";

const NotePage = () => {
    const { id, title } = useParams();
    // console.log("Note ID:", id);
    const { isDark }  = useTheme();
    const { content, status, onChange } = useEditor(id);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-zinc-900' : 'bg-white'} flex flex-col`}>
            {/* Header */}
            <header className={`flex justify-between items-center px-6 py-2 ${isDark ? 'border-b border-zinc-800' : ''}`}>
                <div className="flex items-center gap-2">
                    <h1 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-zinc-800'}`}>New page</h1>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'} cursor-pointer`}>
                        <Lock className={`w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <span className={`${isDark ? 'text-zinc-500' : 'text-zinc-400'} text-sm`}>Private</span>
                        <ChevronDown className={`w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`px-3 py-1 rounded ${isDark ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-zinc-100'} font-medium`}>
                        Share
                    </button>
                    <button className={`p-2 rounded ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
                        <MessageSquare className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
                    </button>
                    <button className={`p-2 rounded ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
                        <Star className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
                    </button>
                    <button className={`p-2 rounded ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
                        <MoreHorizontal className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
                    </button>
                </div>
            </header>
            {/* SỬA Ở CHÕ NÀY CÁC FILE noteService, collabService(websocket), useEditor, EditorTools */}
            {/* <div className={`editor-wrapper ${isDark ? 'bg-zinc-900 text-zinc-100' : ''}`}>
                {content && <EditorComponent data={content} onChange={onChange} />}
            </div>
            <div className={`save-status ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{status}</div> */}
            <div className={`flex-1 flex ${isDark ? 'text-white' : 'text-zinc-800'}`}>
                Đây là nội dung của note với ID: {id}
                title: {content?.title}
            </div>
        </div>
    );
};

export default NotePage;