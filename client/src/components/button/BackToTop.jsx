import top from "../../assets/icons/white/top.svg";
const BackToTop = () => {
  const scrollToTop = () => {
    const duration = 200;
    const start = window.scrollY;
    const startTime = performance.now();

    const scrollStep = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) {
      requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
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
