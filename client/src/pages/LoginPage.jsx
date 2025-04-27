import videofram_login from "../assets/videoframe_login.png";
import InputForm from "../components/Input/InputForm";
import email from "../assets/svg/email.svg";
import lock from "../assets/svg/lock.svg";
import logo from "../assets/logo/logo.png";
import gmail from "../assets/gmail.png";
const LoginPage = () => {
  const handleSubmit = () => {};
  return (
    <>
      <div className=" center h-screen flex items-center justify-center">
        <div className=" rounded-3xl overflow-hidden shadow-lg">
          <div className="relative grid grid-cols-2 max-[900px]:grid-cols-1 gap-4 w-full max-w-4xl h-auto">
            <div className="flex justify-center items-center p-4 max-[900px]:hidden">
              <img
                className="w-full h-auto object-cover"
                src={videofram_login}
                alt="Video Frame"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center p-4 px-[90px] gap-3"
            >
              <h1 className="font-bold text-[30px]">Log in</h1>
              <InputForm placeholder={"Email"} icon={email} type={"email"} />
              <InputForm
                placeholder={"Password"}
                icon={lock}
                type={"password"}
              />
              <p className="cursor-pointer text-[12px] w-full text-right text-gray-500 hover:text-blue-600">
                Forgot password?
              </p>
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded-lg cursor-pointer hover:bg-gray-800"
              >
                Log in
              </button>
              <div className="flex items-center w-full my-2">
                <div className="flex-1 h-px bg-gray-500"></div>
                <p className="px-4 text-[12px] text-gray-500 whitespace-nowrap ">
                  Or log in with
                </p>
                <div className="flex-1 h-px bg-gray-500"></div>
              </div>
              <button className="bg-gray-200 w-full py-2 rounded-lg cursor-pointer hover:bg-gray-300 center gap-2 ">
                <img className="w-8" src={gmail} alt="gmail.png" />
                <h>Log in with Google</h>
              </button>
            </form>
            <div className="w-[150px] absolute top-3 right-1/6 max-[900px]:hidden">
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
