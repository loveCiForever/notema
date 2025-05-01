import top from "../../assets/icons/white/top.svg";
const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 cursor-pointer"
    >
      <img src={top} alt="icon-top" />
    </button>
  );
};

export default BackToTop;
