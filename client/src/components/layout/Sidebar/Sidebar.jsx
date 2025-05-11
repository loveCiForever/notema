import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../../../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";
import DragHandle from "../../ui/DragHandle";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Lock,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import SwitchTheme from "../../button/SwitchTheme";
const Sidebar = () => {
  const {
    isOpen,
    setIsOpen,
    isLocked,
    toggleLock,
    width,
    menuItems,
    setMenuItems,
    isMobile: contextIsMobile,
  } = useSidebar();

  const [draggedItem, setDraggedItem] = useState(null);
  // const [showTooltip, setShowTooltip] = useState(false);
  const sidebarRef = useRef(null);
  const [dropIndicator, setDropIndicator] = useState({
    show: false,
    index: -1,
  });
  const manualToggleRef = useRef(false);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    const dragImg = document.createElement("div");
    dragImg.style.opacity = "0";
    document.body.appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    document.body.removeChild(dragImg);
  };

  const handleDragOver = (e, index) => {
    if (draggedItem === null || draggedItem === index) return;

    const draggedItemData = menuItems[draggedItem];
    const targetItemData = menuItems[index];

    if (draggedItemData.type === "notes" && targetItemData.type === "notes") {
      setDropIndicator({ show: true, index });
      const newItems = [...menuItems];
      const [removed] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, removed);
      setMenuItems(newItems);
      setDraggedItem(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropIndicator({ show: false, index: -1 });
  };

  const sidebarVariants = {
    open: {
      width: `${width}px`,
      transition: { duration: 0.1 },
    },
    closed: {
      width: contextIsMobile ? "0px" : "60px",
      transition: { duration: 0.1 },
    },
  };
  const { theme } = useTheme();

  return (
    <>
      {!isLocked && isOpen && (
        <div
          className="flex flex-col fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <motion.div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full border-r sidebar-container ${
          theme === "dark"
            ? "bg-black/80 border-gray-200 text-white"
            : "bg-white border-gray-200 shadow-xl text-black"
        }`}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Header */}
        <div
          className={`header px-4 py-4 flex items-center justify-center w-full`}
        >
          <div
            className={`flex items-center gap-4 ${
              isOpen ? "flex-1 min-w-0" : ""
            }`}
          >
            <div className="my-2 w-6 h-6 aspect-square rounded-md bg-red-200" />

            {/* <AnimatePresence> */}
            {isOpen && (
              <div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="username font-medium truncate">Quang Huy</div>
              </div>
            )}
            {/* </AnimatePresence> */}
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <button
                  className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                  title="Home"
                >
                  <Home className="w-4 h-4" color="black" />
                </button>
                <button
                  className="rounded-md p-2 hover:bg-gray-200"
                  title="Lock Sidebar"
                  onClick={toggleLock}
                >
                  <Lock
                    className={`w-4 h-4 cursor-pointer ${`${
                      isLocked
                        ? theme === "dark"
                          ? "text-white"
                          : "text-black"
                        : theme === "dark"
                        ? "text-white/50"
                        : "text-black/50"
                    }`}`}
                    color="black"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {menuItems.map((item, index) => (
            <div key={item.id} className="relative">
              {dropIndicator.show && dropIndicator.index === index && (
                <div className="absolute top-0 left-0 right-0 h-0.5 z-10 " />
              )}
              <SidebarItem
                item={item}
                index={index}
                onDragStart={handleDragStart}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                isOpen={isOpen}
                className={`mb-1 ${!isOpen ? "sidebar-collapsed" : ""}`}
              />
            </div>
          ))}
        </div>
        {/* Resize handle */}
        {isOpen && <DragHandle />}

        {/* Footer */}
        <div
          className={`
                        sticky bottom-0 border-t border-gray-200 px-3 py-3
                        flex
                        ${
                          isOpen
                            ? "justify-between" /* mở sidebar: nằm ngang */
                            : "flex-col-reverse items-center gap-3 "
                        }  
                    `}
        >
          <Settings className="h-5 w-5 p-lg-1 cursor-pointer" />
          <SwitchTheme
            width={isOpen ? 48 : 24}
            height={24}
            className="h-5 w-5 cursor-pointer"
          />
        </div>

        {/* Toggle button */}
        <button
          className={`absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full p-2 shadow-md z-45 cursor-pointer ${
            theme === "dark" ? "bg-white/90 text-black" : "bg-white"
          }`}
          onClick={() => {
            manualToggleRef.current = true;
            setIsOpen(!isOpen);
            setTimeout(() => (manualToggleRef.current = false), 500);
          }}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </motion.div>
    </>
  );
};
export default Sidebar;
