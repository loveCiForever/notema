import { useState, useRef, useEffect } from "react";
import InputForm from "../../Input/InputForm";
import userBlackIcon from "../../../assets/icons/black/user.svg";
import emailBlackIcon from "../../../assets/icons/black/email.svg";
import lockBlackIcon from "../../../assets/icons/black/lock.svg";
import whiteUserIcon from "../../../assets/icons/white/user.svg";
import whiteEmailIcon from "../../../assets/icons/white/email.svg";
import whiteLockIcon from "../../../assets/icons/white/lock.svg";
import avtDefault from "../../../assets/logo/logo-main.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useTheme } from "../../../contexts/ThemeContext.jsx";
const UserProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;
  const { user, updateUser } = useAuth();
  const [tempAvatar, setTempAvatar] = useState(user.avatar || "");
  const [tempName, setTempName] = useState(user.fullname || "");
  const [tempEmail, setTempEmail] = useState(user.email || "");
  const [tempGender, setTempGender] = useState(user.gender || "other");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const { isDark } = useTheme();

  const handleToggleChangePassword = () => {
    setToggleChangePassword(!toggleChangePassword);
  };

  const handleChangePassword = async () => {
    // console.log("old password: ", oldPassword);
    // console.log("new password: ", newPassword);

    try {
      const res = await axios.post(
        `${BASE_URL}/users/${user.id}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {

    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("fullname", tempName);
    formData.append("email", tempEmail);
    formData.append("gender", tempGender);

    if (fileInputRef.current.files[0]) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/users/${user.id}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { user: updatedUser } = res.data.data;
      updateUser(updatedUser);
      toast.success(res.data.message);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  useEffect(() => {
    setTempAvatar(user.avatar || "");
    setTempName(user.fullname || "");
    setTempEmail(user.email || "");
    setTempGender(user.gender || "other");
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`absolute inset-0 backdrop-blur-[2px] ${
          isDark ? "bg-black/50" : "bg-black/30"
        }`}
        onClick={onClose}
      />
      <div className={`${isDark ? "bg-zinc-900 text-white shadow-sm shadow-white " : "bg-white shadow-sm shadow-black"} p-8 rounded-2xl w-[420px] relative`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"} text-2xl cursor-pointer`}
        >
          ×
        </button>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDark ? "text-white" : "text-black"}`}>
          Profile
        </h2>

        <div className="relative w-28 h-28 mx-auto mb-5">
          <img
            src={user.avatar ? `${BASE_URL}/public${user.avatar}` : avtDefault}
            className="w-full h-full object-cover rounded-full border border-zinc-300 dark:border-zinc-700"
            alt="avatar"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-full cursor-pointer opacity-0 hover:opacity-100"
          >
            Upload
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <InputForm
            icon={isDark ? whiteUserIcon : userBlackIcon}
            placeholder="Full Name"
            name="name"
            type="text"
            className="width-auto"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <InputForm
            icon={isDark ? whiteEmailIcon : emailBlackIcon}
            placeholder="Email Address"
            name="email"
            type="email"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
          />
          <div className="flex items-center gap-4 mt-2 ml-1">
            <label className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Gender:</label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={tempGender === "male"}
                className="mt-1 cursor-pointer"
                onChange={() => setTempGender("male")}
              />
              <span className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Male</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={tempGender === "female"}
                className="mt-1 cursor-pointer"
                onChange={() => setTempGender("female")}
              />
              <span className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Female</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={tempGender === "other"}
                className="mt-1  cursor-pointer"
                onChange={() => setTempGender("other")}
              />
              <span className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>Other</span>
            </label>
          </div>
        </div>

        {toggleChangePassword && (
          <>
            <div className={`flex justify-between mt-6`}>
              <InputForm
                icon={isDark ? whiteLockIcon : lockBlackIcon}
                placeholder="Old password"
                name="password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-2">
              <InputForm
                icon={isDark ? whiteLockIcon : lockBlackIcon}
                placeholder="New password"
                name="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={
              !toggleChangePassword
                ? handleToggleChangePassword
                : handleChangePassword
            }
            className={`${
              toggleChangePassword 
                ? "w-full bg-zinc-800 text-white hover:bg-zinc-700" 
                : `text-sm border `
            } px-5 py-2 rounded-lg font-bold transition cursor-pointer ${isDark ? "bg-zinc-800 border-zinc-100 text-zinc-300 hover:bg-zinc-700" : "hover:bg-gray-200"}`}
          >
            {toggleChangePassword ? "Confirm password" : "Change Password"}
          </button>

          {!toggleChangePassword && (
            <button
              onClick={handleSave}
              className={`${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-black/90"} px-6 py-2 rounded-lg font-bold text-sm transition cursor-pointer`}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;