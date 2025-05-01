import logo from "../../assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-60 py-12 text-black">
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <img src={logo} alt="Logo" className="w-40" />
          <p className="text-sm text-gray-700 leading-6">
            This open source website is our final project. <br />
            <span className="text-gray-600">
              (Course: Web Programming & Applications)
            </span>
            <br />
            Contribute to our project on GitHub:&nbsp;
            <a
              href="https://github.com/loveCiForever/notema"
              className="font-bold text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Notema
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h2 className="text-base font-bold mb-2">About Us</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <a className="cursor-pointer hover:text-blue-600">Careers</a>
              </li>
              <li>
                <a className="cursor-pointer hover:text-blue-600">
                  Contributor
                </a>
              </li>
              <li>
                <a className="cursor-pointer hover:text-blue-600">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold mb-2">Support</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <a className="cursor-pointer hover:text-blue-600">Feedback</a>
              </li>
              <li>
                <a className="cursor-pointer hover:text-blue-600">FAQ</a>
              </li>
              <li>
                <a className="cursor-pointer hover:text-blue-600">Submit Bug</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
