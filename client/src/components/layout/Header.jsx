import  { useState } from "react";
import logo from "../../assets/logo/logo.png";
import menu from "../../assets/svg/menu.svg";
import close from "../../assets/svg/close.svg";

const Header = () => {
  const [isClickMenu,setIsClickMenu] = useState("false")
  console
  return (
    <>
      <header className="h-[60px] bg-white">
        <div className="flex w-full h-full px-4 ">
          <div className="flex items-center w-full max-lg:justify-between ">
            <div className="w-[100px] cursor-pointer">
              <img src={logo} alt="logo" />
            </div>
            <div className="flex justify-between w-full pl-4 max-lg:hidden ">
              <div>
                <button className="btn-hover-gray">Product</button>
                <button className="btn-hover-gray">Team</button>
                <button className="btn-hover-gray">Individuals</button>
              </div>
              <div className="flex gap-3">
                <button className="btn-hover-gray">Log in</button>
                <button className="btn-black">Sign up</button>
              </div>
            </div>
            <div className="right-0 hidden cursor-pointer max-lg:block"onClick={()=>setIsClickMenu(!isClickMenu)}>
              {!isClickMenu ?<img src={close} alt="icon-close" /> :<img src={menu} alt="icon-menu" />}
            </div>
          </div>
        </div>
        <div className={ `hidden absolute w-[200px] h-[240px] right-0 rounded-b-2xl bg-white z-10 ${isClickMenu ? "hidden " : "max-lg:block"}  `}>
        <div className=" px-4 font-bold ">
          <div className="py-2 border-gray-300 border-y-1 cursor-pointer hover:bg-gray-100">Product</div>
          <div className="py-2 border-gray-300 border-y-1  cursor-pointer hover:bg-gray-100">Team</div> 
          <div className="py-2 border-gray-300 border-y-1  cursor-pointer hover:bg-gray-100">Individuals</div>
        </div>
        <div className=" pt-4 flex flex-col px-4 w-full  border-gray-300 bg-white gap-2">
          <button className=" btn-black text-center">Log in</button>
          <button className=" btn-black-outline text-center">Sign up</button>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;
