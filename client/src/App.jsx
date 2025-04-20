import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/hello");
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <p className="text-6xl font-semibold">{message}</p>
    </div>
  );
}

export default App;
