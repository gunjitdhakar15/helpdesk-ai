import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User registered", userId: newUser._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email & Password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // compare password
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // create token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

export default router;
