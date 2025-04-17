import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    required: true
  },
  bestShots: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
