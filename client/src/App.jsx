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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/verify" element={<ConfirmPage />}></Route>
        <Route path="/home" element={<MainLayout />}>
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
  );
}

export default App;
