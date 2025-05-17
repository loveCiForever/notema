import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../../../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";
import DragHandle from "../../ui/DragHandle";
import { motion } from "framer-motion";
import { Home, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import SwitchTheme from "../../button/SwitchTheme";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import avtDefault from "../../../assets/logo/logo-main.png";
import { toast } from "react-toastify";
const Sidebar = () => {
  const {
    isOpen,
    setIsOpen,
    isLocked,
    width,
    menuItems,
    setMenuItems,
    isMobile: contextIsMobile,
    toggleLock,
    setIsMobile,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarLocked,
  } = useSidebar();

  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user, accessToken, login, logout } = useAuth();

  // useEffect(() => {
  //   console.log(`${BASE_URL}/public${user.user.avatar}`);
  // }, [user]);
  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;

  const [toggleUserProfile, setToggleUserProfile] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);
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

  const handleToggleUserProfile = () => {
    setToggleUserProfile(!toggleUserProfile);
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

  return (
    <>
      {/* {!isLocked && isOpen && (
        <div
          className="flex flex-col fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )} */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full border-r sidebar-container${
          isDark
            ? "bg-white/5 border-gray-200 text-white"
            : "bg-white border-gray-200 shadow-xl text-black"
        }`}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div
          className={`header px-2 pt-3 pb-2 flex items-center justify-center gap-2 w-full`}
        >
          <div
            className={`flex items-center gap-4 ${isOpen ? "flex-1 min-w-0" : ""
              }`}
          >
            <button
              className={`flex items-center justify-center py-2 cursor-pointer rounded-md gap-2 w-full ${isDark ? "hover:bg-gray-200/70" : "hover:bg-gray-200/90"}`}
              onClick={handleToggleUserProfile}
            >
              <img
                className={`w-8 aspect-square object-cover rounded-md mr-2 ${isOpen ? "ml-3" : "ml-2"}`}
                src={
                  user.avatar ? `${BASE_URL}/public${user.avatar}` : avtDefault
                }
              />
              {isOpen && (
                <div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <div className="text-start username font-medium truncate text-md">
                    {user.fullname}
                  </div>
                </div>
              )}
            </button>
          </div>

          {toggleUserProfile && (
            <UserProfile onClose={handleToggleUserProfile} userInfo={user} />
          )}

          {isOpen && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                title="Home"
              >
                <Home className="w-4 h-4" color="black" />
              </button>
            </div>
          )}
        </div>

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

        <div
            className={`
              sticky bottom-0 border-t
              ${isDark ? 'border-zinc-800' : 'border-zinc-200'}
              px-3
              ${isOpen 
                ? 'flex justify-between items-center py-2' 
                : 'flex flex-col-reverse items-center gap-2 py-3'}
            `}
          >
            <button
              className={`
                cursor-pointer font-bold rounded-full p-2 transition-colors
                ${!isOpen ? 'mb-1' : ''}
                ${isDark 
                  ? 'text-zinc-300 hover:bg-zinc-800' 
                  : 'text-zinc-700 hover:bg-zinc-100'}
              `}
              onClick={() => {
                logout();
                navigate('/');
                toast.success('Logged out successfully', {
                  position: 'top-right',
                  autoClose: 2000,
                });
              }}
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>

            <SwitchTheme
              width={isOpen ? 48 : 24}
              height={24}
              className={`
                cursor-pointer
                ${!isOpen ? 'mt-1' : ''}
              `}
            />
          </div>

        <button
          className={`absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full p-2 shadow-md z-45 cursor-pointer ${isDark ? "bg-white/90 text-black" : "bg-white"
            }`}
          onClick={() => {
            setIsOpen(!isOpen);
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
