import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../config";
import Topbar from "../components/Topbar";

const PortfolioDetail = () => {
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        setLoading(true);
        await axios.delete(`${BACKENDURL}/portfolios/${id}`);
        // Redirect to home page after successful deletion
        window.location.href = "/";
      } catch (err) {
        console.error("Error deleting portfolio:", err);
        setError("Failed to delete portfolio. Please try again.");
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A3E36]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Topbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
          <Link to="/" className="mt-4 inline-block text-[#5A3E36] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Topbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
            Portfolio not found
          </div>
          <Link to="/" className="mt-4 inline-block text-[#5A3E36] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen bg-gray-100">
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg mb-4">
                <img 
                  src={portfolio.profileImage} 
                  alt={portfolio.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{portfolio.fullName}</h1>
              <p className="text-gray-600 mb-4">{portfolio.specialization}</p>
              <div className="flex space-x-4 mt-auto">
                <Link 
                  to="/" 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Back to Home
                </Link>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete Portfolio
                </button>
              </div>
            </div>
            <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 mb-6">{portfolio.bio}</p>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
              <p className="text-gray-600 mb-6">{portfolio.contactNumber}</p>
              
              {portfolio.bestShots && portfolio.bestShots.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Best Shots</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.bestShots.map((shot, index) => (
                      <div key={index} className="aspect-w-1 aspect-h-1">
                        <img 
                          src={shot} 
                          alt={`Best shot ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail; 