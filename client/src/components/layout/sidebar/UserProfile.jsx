import { useState, useRef, useEffect } from "react";
import InputForm from "../../Input/InputForm";
import userIcon from "../../../assets/icons/black/user.svg";
import emailIcon from "../../../assets/icons/black/email.svg";
import lockIcon from "../../../assets/icons/black/lock.svg";
import avtDefault from "../../../assets/logo/logo-main.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext.jsx";

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

  const handleToggleChangePassword = () => {
    setToggleChangePassword(!toggleChangePassword);
  };

  const handleChangePassword = () => {
    console.log("old password: ", oldPassword);
    console.log("new password: ", newPassword);
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
      <div className="bg-white p-8 rounded-2xl w-[420px] relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Profile
        </h2>

        <div className="relative w-28 h-28 mx-auto mb-5">
          <img
            src={user.avatar ? `${BASE_URL}/public${user.avatar}` : avtDefault}
            className="w-full h-full object-cover rounded-full border"
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
            icon={userIcon}
            placeholder="Full Name"
            name="name"
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <InputForm
            icon={emailIcon}
            placeholder="Email Address"
            name="email"
            type="email"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
          />
          <div className="flex items-center gap-4 mt-2 ml-1">
            <label className="text-sm font-medium text-gray-700">Gender:</label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={tempGender === "male"}
                onChange={() => setTempGender("male")}
              />
              <span className="text-sm">Male</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={tempGender === "female"}
                onChange={() => setTempGender("female")}
              />
              <span className="text-sm">Female</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={tempGender === "other"}
                onChange={() => setTempGender("other")}
              />
              <span className="text-sm">Other</span>
            </label>
          </div>
        </div>

        {toggleChangePassword && (
          <>
            <div className="flex justify-between mt-6">
              <InputForm
                icon={lockIcon}
                placeholder="Old password"
                name="password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-2">
              <InputForm
                icon={lockIcon}
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
              toggleChangePassword && "w-full bg-black text-white"
            } text-sm border px-5 py-2 rounded-lg hover:bg-black  font-bold hover:text-white transition cursor-pointer`}
          >
            {toggleChangePassword ? "Confirm password" : "Change Password"}
          </button>

          {!toggleChangePassword && (
            <button
              onClick={handleSave}
              className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-black/80 transition cursor-pointer"
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
