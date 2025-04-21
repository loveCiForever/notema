import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex fixed h-16 items-center justify-between px-4 lg:px-10 py-2 bg-transparent// backdrop-blur-md w-full text-black  bg-red-100//">
      <button
        className="flex"
        onClick={() => {
          window.location.reload();
        }}
      >
        {/* <img src={logo} alt="" className="w-10" /> */}
        <h1 className="text-xl font-bold">Notema</h1>
      </button>

      <div className="flex items-center gap-4 text-md font-medium bg-red-100//">
        <button
          className="px-4 py-1 rounded-md hover:bg-gray-100"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>

        <div className="h-5 border-[1px]"></div>
        <button
          className="px-4 py-1 rounded-md hover:bg-gray-100"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default NavBar;
