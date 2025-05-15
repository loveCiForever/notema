import { useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.png";
const Footer = () => {
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    setCurrentWidth(innerWidth);
  });
  return (
    <footer className="w-full bg-white shadow-sm text-sm md:text-base lg:text-lg text-black px-5 md:px-10 lg:px-20 xl:px-40 py-10 lg:py-10 border-t-[1px] border-gray-300">
      <div className="w-full max-w-screen-xl// md:py-8">
        <div className="w-full xl:flex md:items-center xl:justify-between">
          <div className="flex flex-col items-start mb-8 xl:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10" alt="notema Logo" />
            <span className="font-normal mt-4 ml-1 text-sm tracking-wider">
              This website is out final project of Web Programming &
              Applications. <br />
              The open source can be found at{" "}
              <a
                href="https://github.com/loveCiForever/notema"
                className="font-bold hover:underline"
              >
                notema
              </a>
            </span>
          </div>

          <ul
            className={`flex flex-wrap items-center mb-0 font-medium sm:mb-0 justify-between sm:gap-10 p-4 bg-gray-100 rounded-lg ml-1 xl:p-0 xl:bg-white xl:rounded-none`}
          >
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
