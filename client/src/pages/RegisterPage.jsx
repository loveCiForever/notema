import video_frame_login from "../assets/images/login.png";
import InputForm from "../components/Input/InputForm";
import emailIcon from "../assets/icons/black/email.svg";
import lockIcon from "../assets/icons/black/lock.svg";
import userIcon from "../assets/icons/black/user.svg";
import logo from "../assets/logo/logo.png";
import chevronLeft from "../assets/icons/black/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GoogleLogo from "../assets/logo/googleLogo.svg";
import GithubLogo from "../assets/logo/githubLogo.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { validateEmailInput, validatePasswordInput } from "../utils/validate";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user, register } = useAuth();

  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateEmail = validateEmailInput(email);
    const validatePassword = validatePasswordInput(password);

    if (!validateEmail.valid) {
      toast.error(validateEmail.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail("");
      return;
    }

    if (!validatePassword.valid) {
      toast.error(validatePassword.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPassword("");
      return;
    }

    if (!fullname || !email || !password || !confirmPassword) {
      setError("Please fill in all fields!");
      toast.error("Please fill in all fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    await register(fullname, email, password, confirmPassword);
    navigate("/home");
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 center h-screen flex items-center justify-center">
        <div className="rounded-xl shadow-md bg-white p-8 sm:p-10 w-full mx-5 sm:mx-10 md:mx-40 lg:py-20 xl:py-10 lg:mx-60 xl:w-auto xl:min-w-[1000px]">
          <div className="grid xl:grid-cols-2 gap-4 w-full max-w-4xl h-auto">
            <div className="justify-center items-center p-4 hidden xl:block">
              <img
                className="w-full h-auto object-cover"
                src={video_frame_login}
                alt="Video Frame"
              />
            </div>
            <div className="flex flex-col justify-center items-center lg:px-[60px] gap-3 bg-red-100//">
              <div
                className="flex w-full mb-6 items-center justify-between cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img src={logo} alt="logo" className="w-[150px]" />

                <div className="flex items-center opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer">
                  <img
                    src={chevronLeft}
                    alt="chevron-left"
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-sm font-medium">Back</span>
                </div>
              </div>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <InputForm
                  placeholder={"Full Name"}
                  icon={userIcon}
                  type={"text"}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <InputForm
                  placeholder={"Email"}
                  icon={emailIcon}
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                  placeholder={"Password"}
                  icon={lockIcon}
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputForm
                  placeholder={"Confirm password"}
                  icon={lockIcon}
                  type={"password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* {error ? <p className="text-red-600 text-[12px]">{error}</p> : ""} */}
                <button
                  className="bg-black text-lg font-bold text-white w-full py-2 mt-3 rounded-xl cursor-pointer hover:bg-black/50 active:scale-[.98] active:duration-75 transition-all"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              </form>
              {/* <div className="flex items-center w-full my-2">
                <div className="flex-1 h-px bg-gray-400"></div>
                <p className="px-4 text-[14px] text-gray-500 whitespace-nowrap ">
                  Or sign up with
                </p>
                <div className="flex-1 h-px bg-gray-400"></div>
              </div>
              <div className="w-full flex gap-2">
                <button className="bg-white border-[1px] border-gray-200 w-full py-3 rounded-xl cursor-pointer hover:bg-gray-100 center gap-4 active:scale-[.98] active:duration-75 transition-all">
                  <img className="w-6" src={GoogleLogo} alt="gmail.png" />
                  <h1>Google</h1>
                </button>
                <button className="bg-white border-[1px] border-gray-200 w-full py-3 rounded-xl cursor-pointer hover:bg-gray-100 center gap-4 active:scale-[.98] active:duration-75 transition-all">
                  <img className="w-6" src={GithubLogo} alt="github.png" />
                  <h1>Github</h1>
                </button>
              </div> */}
              <div className="flex mt-4 gap-1">
                <p className="text-[14px] text-gray-800">
                  Already have an account?
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer ml-1 text-[14px] font-semibold text-black hover:underline active:scale-[.98] active:duration-75 transition-all"
                >
                  {"Log in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
