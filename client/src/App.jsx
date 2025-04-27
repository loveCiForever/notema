import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScreenSizePanel from "./components/ui/ScreenSizePanel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
     { /*<ScreenSizePanel position={"top-left"}/> */}
    </Router>
  );
}

export default App;
