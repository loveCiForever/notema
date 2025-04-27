import logo from "../../assets/logo/logo.png";
const Footer = () => {
  return (
    <footer className="flex items-center justify-start w-full gap-20 py-20 text-black bg-white border-gray-200 px-60 border-t-1">
      <div className="flex flex-col items-start justify-start w-1/3">
        <img src={logo} alt="" className="w-2/3" />
        <h1 className="mt-6 ml-3 text-sm font-normal leading-6 tracking-wider">
          This open source website is our final project. <br />
          (Course: Web Programming & Applications) <br />
          Available on Github:{" "}
          <a
            href="https://github.com/loveCiForever/notema"
            className="font-bold cursor-pointer hover:text-blue-500"
          >
            Notema
          </a>
        </h1>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-60">
          <div className="flex flex-col w-auto px-10">
            <h2 className="text-base font-bold">About Us</h2>
            <div className="flex flex-col gap-0.5 mt-1 text-base text-gray-700">
              <a className="cursor-pointer hover:text-blue-600">Careers</a>
              <a className="cursor-pointer hover:text-blue-600">Contributor</a>
              <a className="cursor-pointer hover:text-blue-600">
                Terms & Privacy
              </a>
            </div>
          </div>
          <div className="flex flex-col w-auto px-10">
            <h2 className="text-base font-bold">Support</h2>
            <div className="flex flex-col gap-0.5 mt-1 text-base text-gray-700">
              <a className="cursor-pointer hover:text-blue-600">Feedback</a>
              <a className="cursor-pointer hover:text-blue-600">FAQ</a>
              <a className="cursor-pointer hover:text-blue-600">Submit Bug</a>
            </div>
          </div>
        </div>

        {/* <h1 className="pl-10 mt-6 text-base font-bold">
          This website is an open source. Available on Github
        </h1> */}
      </div>
    </footer>
  );
};

export default Footer;
