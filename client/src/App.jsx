import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
// import ScreenSizePanel from "./components/ui/ScreenSizePanel";
import NotePage from "./pages/NotePage";
import ConfirmPage from "./pages/ConfirmPage";
import MainLayout from "./components/layout/MainLayout";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";
import MainLayoutPage from "./components/layout/MainLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import VerifyNoticeModal from "./components/ui/VerifyNoticeModal";
import { useState, useEffect } from "react";
function App() {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.is_verified === "0" && user.verification_token) {
        setShowVerifyModal(true);
        setToken(user.verification_token);
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <VerifyNoticeModal
          isOpen={showVerifyModal}
          onClose={() => setShowVerifyModal(false)}
          token={token}
        />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/verify" element={<ConfirmPage />}></Route>
          <Route path="/home" element={<MainLayoutPage />}>
            {/* Khi /home => render trang home */}
            <Route index element={<HomePage />} />
            {/* Khi /home/note => render trang note */}
            <Route path="note" element={<NotePage />} />
            {/* Khi /home/note/:id => render trang edit hoặc tạo mới */}
            <Route path="note/:id" element={<NotePage />} />
          </Route>
        </Routes>
        {/* <ScreenSizePanel position={"top-left"} /> */}
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
