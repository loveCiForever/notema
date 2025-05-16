import BackToTop from "../components/button/BackToTop";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import { useEffect, useState } from "react";
import LandingPageImage1 from "../assets/images/landing_1.png";
import LandingPageImage2 from "../assets/images/landing_2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  const handleLoginButton = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`${
          isScrolled ? "shadow-2xl" : ""
        } relative sm:fixed w-full top-0 z-10`}
      >
        <Header />
      </div>
      <div className="flex flex-col lg:pt-[70px] px-5 md:px-10 lg:px-20 xl:px-40 pt-10 sm:pt-30 pb-20">
        <div className="grid items-center xl:min-h-screen grid-cols-1 xl:grid-cols-2 xl:gap-10  bg-green-200//">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold leading-tight">
              The super convenient working space
            </h1>
            <p className="text-lg sm:text-xl text-black/70">
              Are you afraid of forgetting important tasks? Create your plan
              smartly and get reminders whenever you forget.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-4 py-2 font-bold rounded-lg btn-primary"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
              <button
                className="px-4 py-2 font-bold rounded-lg btn-primary-outline"
                onClick={handleLoginButton}
              >
                Log in
              </button>
            </div>
          </div>
          <img
            src={LandingPageImage1}
            alt="Landing Section"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="grid items-center xl:min-h-screen grid-cols-1 xl:grid-cols-2 xl:gap-10 pt-30 sm:pt-60// bg-red-200//">
          <div className="flex flex-col gap-5 mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-bold leading-tight">
              Share your planning ideas with your friends.
            </h1>
            <p className="text-lg text-black/70">
              Your friends can view your plans, interact with you, and make life
              more community-oriented.
            </p>
          </div>
          <img
            src={LandingPageImage2}
            alt="Share Plans"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <BackToTop />
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
