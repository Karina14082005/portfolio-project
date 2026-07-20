const adminMiddleware = (req, res, next) => {

    // Check if logged-in user is admin
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Admin Only"
        });
    }

    // If role is admin, continue
    next();
};

module.exports = adminMiddleware;