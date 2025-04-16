import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, location, occupation } = req.body;

    // Check for missing required fields
    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "First name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10); // Specifying rounds for better security
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picturePath || "", // Default to an empty string if not provided
      friends: [], // Default empty array
      location: location || "", // Default empty string if not provided
      occupation: occupation || "", // Default empty string if not provided
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Removing sensitive data before sending user data
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
