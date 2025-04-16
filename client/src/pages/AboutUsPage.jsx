
import image2 from "../assets/image2.jpg";

export const AboutUs = () => {
  return ( 
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-300 backdrop-blur-lg bg-opacity-90">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About The Photography Hub
        </h2>
        <p className="text-gray-700 text-lg text-center mb-4">
          Welcome to The Photography Hub, a platform designed for photographers
          to showcase their talent and for clients to explore and admire
          exceptional photography portfolios.
        </p>
        <p className="text-gray-700 text-lg text-center mb-4">
          Our goal is to bridge the gap between photographers and their audience
          by creating a space where art meets appreciation.
        </p>
        <p className="text-gray-700 text-lg text-center mb-4">
          Whether you're a seasoned professional or just starting out, this hub
          empowers you to share your work, connect with your audience, and leave
          an impact through your creative lens.
        </p>
        <h3 className="text-2xl font-semibold text-center text-gray-800 mt-6">
          Our Mission
        </h3>
        <p className="text-gray-700 text-lg text-center mb-6">
          To create an inclusive and inspiring space for photographers to grow
          and for clients to discover the beauty of photography.
        </p>
        <p className="text-center text-gray-500">
          © 2025 The Photography Hub. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
