import Portfolio from '../models/Portfolio.js';

// Get all portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single portfolio by ID
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);
    
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new portfolio
export const createPortfolio = async (req, res) => {
  try {
    const { fullName, contactNumber, specialization, bio, profileImage, bestShots } = req.body;
    
    const newPortfolio = new Portfolio({
      fullName,
      contactNumber,
      specialization,
      bio,
      profileImage,
      bestShots
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error("Error creating portfolio:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    
    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: error.message });
  }
};