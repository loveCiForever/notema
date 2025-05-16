import { Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const HomePage = () => {
  const { user } = useAuth();

  if (!user) {
    toast.error("You must be logged in first");
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};

export default HomePage;
