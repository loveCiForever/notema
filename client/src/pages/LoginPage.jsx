import video_frame_login from "../assets/videoframe_login.png";
import InputForm from "../components/Input/InputForm";
import email from "../assets/svg/email.svg";
import lock from "../assets/svg/lock.svg";
import logo from "../assets/logo/logo.png";
import GoogleLogo from "../assets/logo/googleLogo.svg";
import GithubLogo from "../assets/logo/githubLogo.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const handleSubmit = () => {};
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-100 center h-screen flex items-center justify-center">
        <div className="rounded-xl overflow-hidden shadow-md bg-white p-10 w-full mx-10 md:mx-40 lg:py-20 xl:py-10 lg:mx-60 xl:w-auto xl:min-w-[1000px]">
          <div className="grid xl:grid-cols-2 gap-4 w-full max-w-4xl h-auto">
            <div className="justify-center items-center p-4 hidden xl:block">
              <img
                className="w-full h-auto object-cover"
                src={video_frame_login}
                alt="Video Frame"
              />
            </div>
            <div className="flex flex-col justify-center items-center lg:px-[60px] gap-3 bg-red-100//">
              <div className="flex w-full mb-6 items-center justify-start">
                <img src={logo} alt="logo" className="w-[150px]" />
              </div>
              <InputForm placeholder={"Email"} icon={email} type={"email"} />
              <InputForm
                placeholder={"Password"}
                icon={lock}
                type={"password"}
              />
              <p className="cursor-pointer text-[14px] w-full text-right text-gray-500 hover:text-blue-600 active:scale-[.98] active:duration-75 transition-all">
                Forgot password?
              </p>
              <button
                onClick={handleSubmit()}
                className="bg-black text-lg font-bold text-white w-full py-2 rounded-xl cursor-pointer hover:bg-black/50 active:scale-[.98] active:duration-75 transition-all"
              >
                Log in
              </button>
              <div className="flex items-center w-full my-2">
                <div className="flex-1 h-px bg-gray-400"></div>
                <p className="px-4 text-[14px] text-gray-500 whitespace-nowrap ">
                  Or log in with
                </p>
                <div className="flex-1 h-px bg-gray-400"></div>
              </div>
              <div className="w-full flex gap-2">
                <button className="bg-white border-[1px] border-gray-200 w-full py-3 rounded-xl cursor-pointer hover:bg-gray-100 center gap-4 active:scale-[.98] active:duration-75 transition-all">
                  <img className="w-6" src={GoogleLogo} alt="gmail.png" />
                  <h>Google</h>
                </button>
                <button className="bg-white border-[1px] border-gray-200 w-full py-3 rounded-xl cursor-pointer hover:bg-gray-100 center gap-4 active:scale-[.98] active:duration-75 transition-all">
                  <img className="w-6" src={GithubLogo} alt="github.png" />
                  <h>Github</h>
                </button>
              </div>
              <div className="flex items-center justify-center mt-4 gap-1">
                <p className="text-[14px] text-gray-800">
                  Don't have an account ?
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="ml-1 text-[14px] font-semibold text-black hover:underline active:scale-[.98] active:duration-75 transition-all"
                >
                  {"   Register one"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
