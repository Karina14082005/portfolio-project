const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
         console.log("AUTH HEADER:", authHeader);
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided"
            });
        }

        const parts = authHeader.split(" ");

      console.log("AUTH PARTS:", parts);

       const token = parts[1];

        console.log("TOKEN LENGTH:", token.length);
        console.log("EXTRACTED TOKEN:", token);
        console.log("Authorization Header:", req.headers.authorization);
        console.log("Token:", token);
          console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
    console.log(error);

    return res.status(401).json({
        success: false,
        message: error.message
    });
}
};

module.exports = authMiddleware;