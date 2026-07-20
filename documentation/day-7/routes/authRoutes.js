const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// =============================
// Test Route
// =============================
router.get("/", (req, res) => {
    res.send("Authentication Route Working");
});

// =============================
// Register Route
// =============================
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],
    async (req, res) => {
        try {

            // Validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { name, email, password } = req.body;

            // Check Existing User
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create User
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // Save User
            await newUser.save();

            res.status(201).json({
                success: true,
                message: "User Registered Successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
);

// =============================
// Login Route
// =============================
router.post("/login", async (req, res) => {
 console.log("NEW LOGIN ROUTE RUNNING");

    try {

        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate Access Token
        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Generate Refresh Token
        const refreshToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.REFRESH_SECRET,
            {
                expiresIn: process.env.REFRESH_EXPIRES_IN
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
        


// =============================
// Protected Route
// =============================
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Route Accessed Successfully",
        user: req.user
    });

});

// =============================
// Refresh Token Route
// =============================
router.post("/refresh-token", (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh Token Required"
        });
    }

    try {
console.log("Refresh Token:", refreshToken);
console.log("Refresh Secret:", process.env.REFRESH_SECRET);
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        const accessToken = jwt.sign(
            {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            success: true,
            accessToken
        });

    }catch (error) {

    console.log(error);

    return res.status(401).json({
        success: false,
        message: error.message
    });

}

});
// =============================
// Admin Route
// =============================
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin",
            user: req.user
        });

    }
);
// =============================
// Logout Route
// =============================
router.post("/logout", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Logout Successful. Please remove the token from client storage."
    });

});

module.exports = router;