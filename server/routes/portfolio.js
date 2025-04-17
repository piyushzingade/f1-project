import express from "express";
import { getAllPortfolios, getPortfolioById, createPortfolio, deletePortfolio } from '../controllers/portfolio.js';

const router = express.Router();
// Get all portfolios
router.get('/', getAllPortfolios);

// Get a single portfolio by ID
router.get('/:id', getPortfolioById);

// Create a new portfolio
router.post('/', createPortfolio);

// Delete a portfolio
router.delete('/:id', deletePortfolio);

export default router;
