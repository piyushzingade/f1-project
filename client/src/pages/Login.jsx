import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image1 from "../assets/image1.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      console.log("Login successful", res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${image1})` }}
    >
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
