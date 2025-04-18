import React, { useEffect, useState } from "react";
import image1 from "../assets/image1.jpg";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKENDURL } from "../config";
import { Link } from "react-router-dom";

const Home = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKENDURL}/portfolios`);
        setPortfolios(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        setError("Failed to load portfolios. Please try again later.");
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${image1})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Topbar />
      <motion.div
        className="w-full max-w-5xl mt-20 p-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center text-brown-700">
            The Photography Hub
          </h1>
          
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A3E36]"></div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12 bg-white bg-opacity-70 rounded-lg shadow">
            <p className="text-gray-500 text-lg">No portfolios found. Create your first portfolio!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {portfolios.map((portfolio) => (
              <motion.div
                key={portfolio._id}
                className="bg-orange-300 bg-opacity-50 p-6 rounded-xl shadow-md text-center w-56"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                  <img 
                    src={`/public/assets/${portfolio.profileImage.split('/').pop()}`} 
                    alt={portfolio.fullName} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image loading error:", e.target.src);
                      e.target.onerror = null;
                      e.target.src = "/assets/default-profile.jpg";
                    }}
                  />
                </div>
                <p className="text-brown-800 font-semibold">{portfolio.fullName}</p>
                <p className="text-brown-700 text-sm mb-2">{portfolio.specialization}</p>
                <Link 
                  to={`/portfolio/${portfolio._id}`}
                  className="mt-3 px-5 py-2 bg-[#5A3E36] text-white rounded-lg hover:bg-[#422a22] transition inline-block"
                >
                  View Portfolio
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
