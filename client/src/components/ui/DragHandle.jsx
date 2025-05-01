"use client";

import { useState, useEffect } from "react";
import { useSidebar } from "../../contexts/SidebarContext";

const DragHandle = () => {
    const { width, setWidth, isOpen } = useSidebar();
    const [isDragging, setIsDragging] = useState(false);

    // Min and max width constraints
    const minWidth = 235;
    const maxWidth = 500;

    const startDragging = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging && isOpen) {
                const newWidth = e.clientX;
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    setWidth(newWidth);
                }
            }
        };
        // set if width < 130 set side bar to collapsed

        ////
        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, setWidth, isOpen]);

    return (
        <div
            className={`absolute right-0 top-0 w-1 h-full cursor-col-resize group z-50 ${isDragging ? "bg-primary/50" : "hover:bg-primary/20"
                }`}
            onMouseDown={startDragging}
            onTouchStart={startDragging}
        >
        </div>
    );
};

export default DragHandle;
