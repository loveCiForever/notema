import { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
const Footer = () => {
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    setCurrentWidth(innerWidth);
  });
  return (
    <footer class="w-full bg-white shadow-sm text-sm md:text-base lg:text-lg text-black px-5 md:px-10 lg:px-20 xl:px-40 py-10 lg:py-10 border-t-[1px] border-gray-300">
      <div class="w-full max-w-screen-xl// md:py-8">
        <div class="w-full sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            class="flex items-center mb-8 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img src={logo} class="h-8" alt="notema Logo" /> */}
            <span className="font-bold text-3xl sm:text-xl lg:text-2xl tracking-wide">
              Notema.
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 font-medium sm:mb-0 justify-between sm:gap-10">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
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
