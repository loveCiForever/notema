import { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
const Footer = () => {
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    setCurrentWidth(innerWidth);
  });
  return (
    <footer class="bg-white shadow-sm dark:bg-black/90 text-sm lg:text-lg text-white md:px-10 lg:px-20 xl:px-40 py-4 lg:py-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img src={logo} class="h-8" alt="notema Logo" /> */}
            <span className="font-bold text-3xl sm:text-xl lg:text-2xl tracking-wide">
              Notema.
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 font-medium sm:mb-0">
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
        <hr class="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <span class="block sm:text-center">
          © 2025{" "}
          <a href="" class="hover:underline">
            Notema™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
