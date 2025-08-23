import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// create axios instance (no more messing with defaults)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axiosInstance.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      // ✅ attach Bearer token with interceptor (safe way)
      axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${storedToken}`;
        return config;
      });
    }

    fetchBlogs();
  }, []);

  const value = {
    axios: axiosInstance, // use this everywhere
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
