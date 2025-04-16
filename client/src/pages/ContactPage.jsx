import { useState } from "react";
import image2 from "../assets/image2.jpg";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg border border-gray-300 backdrop-blur-lg bg-opacity-90">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg text-center mb-4">
          If you have any questions or inquiries, feel free to reach out to us
          using the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">
              Message:
            </label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-brown-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brown-600 text-white p-3 rounded-lg font-bold hover:bg-brown-700 transition"
          >
            Send Message
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          © 2025 The Photography Hub. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
