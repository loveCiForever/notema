import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScreenSizePanel from "./components/ui/ScreenSizePanel";
import ConfirmPage from "./pages/ConfirmPage";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/verify" element={<ConfirmPage />} />
      </Routes>
      {/* <ScreenSizePanel position={"top-left"} /> */}
      <ToastContainer />
    </Router>
  );
}

export default App;
