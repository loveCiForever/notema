import NavBar from "../components/layout/NavBar";
import { useTheme } from "../contexts/ThemeContext";

const HomePage = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full h-screen items-center justify-center ${
        theme == "dark" ? "bg-black/90" : "bg-white"
      }`}
    >
      <NavBar />
    </div>
  );
};

export default HomePage;
