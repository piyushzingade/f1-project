import React, { useEffect, useState } from "react";
import image1 from "../assets/image1.jpg";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";

const Home = () => {
  const users = [
    { id: 1, username: "@user_name" },
    { id: 2, username: "@user_name" },
    { id: 3, username: "@user_name" },
    { id: 4, username: "@user_name" },
    { id: 5, username: "@user_name" },
    { id: 6, username: "@user_name" },
    { id: 7, username: "@user_name" },
    { id: 8, username: "@user_name" },
  ];

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
        <h1 className="text-4xl font-bold text-center text-brown-700 mb-6">
          The Photography Hub
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              className="bg-orange-300 bg-opacity-50 p-6 rounded-xl shadow-md text-center w-56"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: user.id * 0.1 }}
            >
              <div className="w-full h-40 bg-yellow-200 bg-opacity-50 rounded-lg mb-4"></div>
              <p className="text-brown-800 font-semibold">{user.username}</p>
              <button className="mt-3 px-5 py-2 bg-[#5A3E36] text-white rounded-lg hover:bg-[#422a22] transition">
                View Portfolio
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
