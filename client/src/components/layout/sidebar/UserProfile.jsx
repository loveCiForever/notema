import { useState, useRef, useEffect } from "react";
import InputForm from "../../Input/InputForm";
import userIcon from "../../../assets/icons/black/user.svg";
import emailIcon from "../../../assets/icons/black/email.svg";
import avtDefault from "../../../assets/logo/logo-main.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const UserProfile = ({ onClose, onSave, userInfo }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { updateUser } = useAuth();
  const [tempAvatar, setTempAvatar] = useState(userInfo.avatar || "");
  const [tempName, setTempName] = useState(userInfo.fullname || "");
  const [tempEmail, setTempEmail] = useState(userInfo.email || "");
  const [tempGender, setTempGender] = useState(userInfo.gender || "other");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
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
        `${BASE_URL}/users/${userInfo.id}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.data.avatar);
      const newAvatarUrl = res.data.data.avatar;
      const fullname = res.data.data.fullname;
      const email = res.data.data.email;
      const gender = res.data.data.gender;

      updateUser({
        avatar: newAvatarUrl,
        fullname: fullname,
        email: email,
        gender: gender,
      });
      toast.success(res.data.message);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

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
            src={userInfo.avatar ? `${userInfo.avatar}` : avtDefault}
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

        <div className="flex justify-between mt-6">
          <button
            onClick={handleChangePassword}
            className="text-sm border px-5 py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
          >
            Change Password
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-black/80 transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
