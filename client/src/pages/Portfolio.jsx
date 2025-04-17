import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../config";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";

const Portfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKENDURL}/portfolios/${id}`);
        setPortfolio(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio. Please try again later.");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A3E36]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-orange-100 flex items-center justify-center">
        <div className="text-red-600 text-center p-4 bg-white rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-orange-100 flex items-center justify-center">
        <div className="text-gray-600 text-center p-4 bg-white rounded-lg shadow">
          Portfolio not found
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-orange-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <img
                  src={`${BACKENDURL}/${portfolio.profileImage}`}
                  alt={portfolio.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[#5A3E36] mb-2">
                  {portfolio.fullName}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{portfolio.specialization}</p>
                <p className="text-gray-700">{portfolio.bio}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <h2 className="text-2xl font-bold text-[#5A3E36] mb-4">Portfolio Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      src={`${BACKENDURL}/${image}`}
                      alt={`Portfolio image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Portfolio; 