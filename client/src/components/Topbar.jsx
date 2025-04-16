import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">The Photography Hub</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-lg">
        <li>
          <Link to="/" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/createPortfolio" className="hover:text-gray-400 transition">
            Create
          </Link>
        </li>
        <li>
          <Link to="/contact-us" className="hover:text-gray-400 transition">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about-us" className="hover:text-gray-400 transition">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
