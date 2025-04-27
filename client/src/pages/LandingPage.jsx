import BackToTop from "../components/button/BackToTop";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useEffect, useRef, useState } from "react";
import LandingPageImage1 from "../assets/videoframe_0.png";
import LandingPageImage2 from "../assets/videoframe_2.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`${
          isScrolled ? "shadow-2xl" : ""
        } relative sm:fixed w-full top-0 z-10 `}
      >
        <Header />
      </div>
      <div className="flex flex-col mt-0 px-60 ">
        <div className="flex items-center w-full h-screen grid-cols-2 gap-4 bg-red-200// content-1 max-lg:grid-cols-1 ">
          <div className="flex flex-col gap-8">
            <h1 className="text-[80px] font-bold leading-[73px]">
              The convenient working space
            </h1>
            <p className="text-[25px] leading-[30px] text-black/70">
              Are you afraid of forgetting important tasks? Create your plan
              smartly and get reminders whenever you forget.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 font-bold rounded-lg btn-primary "onClick={()=>navigate("/register")}>
                Sign up
              </button>
              <button className="px-4 py-2 font-bold rounded-lg btn-primary-outline" onClick={()=>navigate("/login")}>
                Log in
              </button>
            </div>
          </div>
          <img src={LandingPageImage1} alt="" className="w-1/2" />
        </div>
        <div className="flex items-center w-full h-screen grid-cols-2 gap-4 bg-green-200// content-2 max-xl:grid-cols-1 ">
          <div className="flex flex-col gap-5">
            <h1 className="text-[70px] font-bold leading-[73px] ">
              Share your planning ideas with your friends.
            </h1>
            <p className="text-[20px] leading-[24px] text-black/70">
              Your friends can view your plans, interact with you, and make life
              more community-oriented.
            </p>
          </div>

          <img src={LandingPageImage2} alt="" className="w-1/2" />
        </div>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
};

export default LandingPage;
