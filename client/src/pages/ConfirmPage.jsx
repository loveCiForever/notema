import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;
  const [status, setStatus] = useState({
    loading: true,
    success: null,
    message: "",
  });

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setStatus({
        loading: false,
        success: false,
        message: "No verification token provided.",
      });
      return;
    }

    fetch(`${BASE_URL}/auth/verify?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        setStatus({
          loading: false,
          success: data.success,
          message: data.message,
        });
      })
      .catch(() => {
        setStatus({
          loading: false,
          success: false,
          message: "Network error. Please try again later.",
        });
      });
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
        {status.loading ? (
          <p className="text-gray-700 text-lg">Verifying your account ... </p>
        ) : status.success ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Verification Successful
            </h1>
            <p className="text-gray-600 mb-6">Thanks for using our service</p>
            <button
              className="inline-block px-6 py-2 bg-black text-white font-medium rounded hover:bg-black/80"
              onClick={() => navigate("/home")}
            >
              Return Home
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">Thanks for using our service</p>
            <button
              className="inline-block px-6 py-2 bg-black text-white font-medium rounded hover:bg-black/80"
              onClick={() => window.location.reload()}
            >
              Verify again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmPage;
