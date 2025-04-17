import express from "express";
import { getAllPortfolios, createPortfolio, deletePortfolio } from '../controllers/portfolio.js';

const router = express.Router();
// Get all portfolios
router.get('/', getAllPortfolios);

// Create a new portfolio
router.post('/', createPortfolio);

// Delete a portfolio
router.delete('/:id', deletePortfolio);

export default router;
