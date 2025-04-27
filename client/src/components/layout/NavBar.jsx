import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const currentLocation = window.location.pathname;
  const isLandingPage = currentLocation === "/";

  return (
    <div>
      {isLandingPage ? (
        <div
          className={`flex fixed h-16 items-center justify-between bg-transparent  backdrop-blur-md w-full text-black px-4 sm:px-6 md:px-10`}
        >
          <button
            className="flex"
            onClick={() => {
              window.location.reload();
            }}
          >
            {/* <img src={logo} alt="" className="w-10" /> */}
            <h1 className="text-xl font-bold">Notema.</h1>
          </button>

          <div className="flex items-center gap-4 text-md font-medium">
            <button
              className={`px-4 py-1.5 rounded-md hover:bg-gray-200`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <div className="h-5 border-[1px] hidden md:block"></div>
            <button
              className={`px-4 py-1.5 rounded-md hover:bg-gray-200 hidden md:block`}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex fixed h-16 items-center justify-between bg-transparent px-4 lg:px-10 py-2 backdrop-blur-md w-full text-black ${
            theme === "dark" ? "text-white bg-black/60" : ""
          }`}
        >
          <button
            className="flex"
            onClick={() => {
              window.location.reload();
            }}
          >
            {/* <img src={logo} alt="" className="w-10" /> */}
            <h1 className="text-xl font-bold">Notema.</h1>
          </button>

          <div className="flex items-center gap-4 text-md font-medium bg-red-100//">
            <div>
              <button
                className={`text-sm px-5 py-1.5 mr-4 rounded-lg  tracking-wider ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-black/83 hover:bg-black/60 text-white"
                }`}
                onClick={toggleTheme}
              >
                Switch to {theme == "light" ? "Dark mode" : "Light mode"}
              </button>
            </div>
            <button
              className={`px-4 py-1.5 rounded-md ${
                theme === "dark"
                  ? " text-white hover:bg-black/50"
                  : "text-black hover:bg-gray-100"
              }`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>

            <div className="h-5 border-[1px]"></div>
            <button
              className={`px-4 py-1.5 rounded-md ${
                theme === "dark"
                  ? " text-white hover:bg-black/50"
                  : "text-black hover:bg-gray-100"
              }`}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
