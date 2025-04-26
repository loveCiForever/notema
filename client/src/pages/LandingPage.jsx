import BackToTop from "../components/button/BackToTop";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useEffect, useRef, useState } from "react";
import "../Style/transition.css"
const LandingPage = () => {
  const imagesfake = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_oF67RvI-X9OiorV8JGZcHbGY37zwHk0uOIw7Caiy8ChFtvTJagYAY7zqryAdLJWUmiWFzGF3KHwSNw_7Rjr0NYNpULwPMvTU7gcCRJWiCIph59YmLVALVRbXjXQcsXcGEKcx58pbIUgR/s1200/naruto-llega-a-los-animes-del-canal-1.jpg",
    "https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png",
    "https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg",
    "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/06/10-questions-naruto-still-hasn-t-answered-for-fans.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === imagesfake.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <>
      <Header />
      <div
        className="relative flex bg-white overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        {imagesfake.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className={`absolute w-full h-screen object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="px-20 py-10 flex flex-col">
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4 h-screen items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[76px] font-bold leading-[73px]">
              The convenient working space
            </h1>
            <p className="text-[22px] leading-[28px]">
              Are you afraid of forgetting important tasks? Create your plan
              smartly and get reminders whenever you forget.
            </p>
            <div className="flex gap-3">
              <button className="btn-primary px-4 py-2 font-bold rounded-lg ">
                Sign up
              </button>
              <button className=" btn-primary-outline px-4 py-2 font-bold rounded-lg  ">
                Log in
              </button>
            </div>
          </div>
          <div className="flex-1/2">
            <img
              className="fix-img"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_oF67RvI-X9OiorV8JGZcHbGY37zwHk0uOIw7Caiy8ChFtvTJagYAY7zqryAdLJWUmiWFzGF3KHwSNw_7Rjr0NYNpULwPMvTU7gcCRJWiCIph59YmLVALVRbXjXQcsXcGEKcx58pbIUgR/s1200/naruto-llega-a-los-animes-del-canal-1.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-4 h-screen items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[60px] font-bold leading-[64px] ">
              Build multiple plans
            </h1>
            <p className="text-[18px] leading-[24px] text-[#78736f]">
              Record your plans by week, day, and month,...
            </p>
          </div>
          <div>
            <img
              className="fix-img"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_oF67RvI-X9OiorV8JGZcHbGY37zwHk0uOIw7Caiy8ChFtvTJagYAY7zqryAdLJWUmiWFzGF3KHwSNw_7Rjr0NYNpULwPMvTU7gcCRJWiCIph59YmLVALVRbXjXQcsXcGEKcx58pbIUgR/s1200/naruto-llega-a-los-animes-del-canal-1.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-4 h-screen items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[60px] font-bold leading-[64px] ">
            Share your planning ideas with your friends.
            </h1>
            <p className="text-[18px] leading-[24px] text-[#78736f]">
            Your friends can view your plans, interact with you, and make life more community-oriented.
            </p>
          </div>
          <div>
            <img
              className="fix-img"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_oF67RvI-X9OiorV8JGZcHbGY37zwHk0uOIw7Caiy8ChFtvTJagYAY7zqryAdLJWUmiWFzGF3KHwSNw_7Rjr0NYNpULwPMvTU7gcCRJWiCIph59YmLVALVRbXjXQcsXcGEKcx58pbIUgR/s1200/naruto-llega-a-los-animes-del-canal-1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <BackToTop></BackToTop>
      <Footer></Footer>
    </>
  );
};

export default LandingPage;
