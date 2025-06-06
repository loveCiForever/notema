import { useState } from "react";
import logo from "../../../assets/logo/logo.png";
import menu from "../../../assets/icons/black/menu.svg";
import close from "../../../assets/icons/black/close.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
const Header = () => {
  const [isClickMenu, setIsClickMenu] = useState("false");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginButton = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="h-[70px] bg-white">
        <div className="flex w-full h-full px-6 ">
          <div className="flex items-center w-full max-lg:justify-between ">
            <div className="w-[100px] cursor-pointer">
              <img src={logo} alt="logo" />
            </div>
            <div className="flex justify-between w-full pl-6 max-lg:hidden ">
              <div className="flex gap-2">
                <button className="btn-hover-gray">Product</button>
                <button className="btn-hover-gray">Team</button>
                <button className="btn-hover-gray">Individuals</button>
              </div>
              <div className="flex gap-3">
                <button className="btn-hover-gray" onClick={handleLoginButton}>
                  Log in
                </button>
                <button
                  className="btn-black"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </div>
            </div>
            <div
              className="right-0 hidden cursor-pointer max-lg:block"
              onClick={() => setIsClickMenu(!isClickMenu)}
            >
              {!isClickMenu ? (
                <img src={close} alt="icon-close" />
              ) : (
                <img src={menu} alt="icon-menu" />
              )}
            </div>
          </div>
        </div>
        <div
          className={`hidden absolute w-[200px] h-auto py-4 top-16 right-6 rounded-2xl border-[0.5px] border-gray-300 shadow-2xl bg-white z-10 ${
            isClickMenu ? "hidden " : "max-lg:block"
          }  `}
        >
          <div className="px-4 font-semibold ">
            <div className="py-2 border-gray-300 cursor-pointer hover:bg-gray-100">
              Product
            </div>
            <div className="py-2 border-gray-300 cursor-pointer border-t-1 hover:bg-gray-100">
              Team
            </div>
            <div className="py-2 border-gray-300 cursor-pointer border-t-1 hover:bg-gray-100">
              Individuals
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 px-4 pt-4 bg-white border-gray-300 ">
            <button
              className="text-center btn-black"
              onClick={handleLoginButton}
            >
              Log in
            </button>
            <button
              className="text-center btn-black-outline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
