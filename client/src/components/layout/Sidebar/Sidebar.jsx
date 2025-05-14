import { useState, useRef } from "react";
import { useSidebar } from "../../../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";
import DragHandle from "../../ui/DragHandle";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Lock,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import SwitchTheme from "../../button/SwitchTheme";
import UserProfileModal from "./UserProfileModal";

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

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropIndicator({ show: false, index: -1 });
  };
  const [showProfileModal, setShowProfileModal] = useState(false);
  const manualToggleRef = useRef(false);
  const [userInfo, setUserInfo] = useState({
    name: "TBOI",
    email: "tboi@gmail.com",
    phone: "0898672065",
    address:"Ho Chi Minh city",
    avatar: null,
  });

  const handleSaveProfile = (newInfo) => {
    setUserInfo(newInfo);
  };
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
            ? "bg-black/80 border-white/50 text-white"
            : "bg-white border-black/20 text-black"
        }`}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Header */}
        <div
          className={`p-2 border-b flex items-center ${
            !isOpen ? "justify-between" : "justify-center"
          } w-full`}
        >
          <div
            className={`flex items-center ${isOpen ? "flex-1 min-w-0" : ""}`}
          >
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm border cursor-pointer hover:opacity-80 transition"
            >
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt="User Avatar"
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0 flex items-center"
                >
                  <div className="ml-2 font-medium truncate">
                    {userInfo.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <button
                  className="p-2 rounded-md mr-1 cursor-pointer"
                  title="Home"
                >
                  <Home className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-md"
                  title="Lock Sidebar"
                  onClick={toggleLock}
                >
                  <Lock
                    className={`h-4 w-4 cursor-pointer ${
                      isLocked
                        ? theme === "dark"
                          ? "text-white"
                          : "text-black"
                        : theme === "dark"
                        ? "text-white/50"
                        : "text-black/50"
                    }`}
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

        {isOpen && <DragHandle />}

        {/* Footer */}
        <div
          className={`
                        sticky bottom-0 border-t px-3 py-2
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

      {showProfileModal && (
        <UserProfileModal
          onClose={() => setShowProfileModal(false)}
          onSave={handleSaveProfile}
          userInfo={userInfo}
        />
      )}
    </>
  );
};

export default Sidebar;
