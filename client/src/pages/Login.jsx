import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login - Attempting login with email:", formData.email);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      console.log("Login - Login result:", result);
      
      if (result.success) {
        console.log("Login - Login successful, redirecting to home");
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Add a small delay before navigation to allow the toast to be seen
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        console.log("Login - Login failed:", result.error);
        setError(result.error);
        toast.error(result.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error("Login - Unexpected error during login:", err);
      const errorMessage = err.response?.data?.error || "Login failed.";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <ToastContainer />
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg border border-gray-300 backdrop-blur-lg bg-opacity-90">
        <h2 className="text-4xl font-bold text-center text-[#762e18] mb-6">
          LOGIN
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#762e18] text-white p-3 rounded-lg font-bold hover:bg-brown-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
