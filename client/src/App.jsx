import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/Login";
import { AboutUs } from "./pages/AboutUsPage";
import { ContactUs } from "./pages/ContactPage";
import Home from "./pages/Home";
import CreatePortfolio from "./components/CreatePortofolio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/createPortfolio" element={<CreatePortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
