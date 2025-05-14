import { useState, useRef } from "react";
import InputForm from "../../Input/InputForm";
import userIcon from "../../../assets/icons/black/user.svg";
import emailIcon from "../../../assets/icons/black/email.svg";
import phoneIcon from "../../../assets/icons/black/phone.svg";
import addressIcon from "../../../assets/icons/black/address.svg";
import avtDefault from "../../../assets/logo/logo-main.png";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onClose, onSave, userInfo }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [tempAvatar, setTempAvatar] = useState(userInfo.avatar || "");
  const [tempName, setTempName] = useState(userInfo.name || "");
  const [tempEmail, setTempEmail] = useState(userInfo.email || "");
  const [tempPhone, setTempPhone] = useState(userInfo.phone || "");
  const [tempAddress, setTempAddress] = useState(userInfo.address || "");
  const [tempGender, setTempGender] = useState(userInfo.gender || "other");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  const handleSave = () => {
    onSave({
      name: tempName,
      email: tempEmail,
      phone: tempPhone,
      avatar: tempAvatar,
      address: tempAddress,
      gender: tempGender,
    });
    onClose();
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
            src={tempAvatar || avtDefault}
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
          <InputForm
            icon={phoneIcon}
            placeholder="Phone Number"
            name="phone"
            type="text"
            value={tempPhone}
            onChange={(e) => setTempPhone(e.target.value)}
          />
          <InputForm
            icon={addressIcon}
            placeholder="Address"
            name="address"
            type="text"
            value={tempAddress}
            onChange={(e) => setTempAddress(e.target.value)}
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

export default UserProfileModal;
