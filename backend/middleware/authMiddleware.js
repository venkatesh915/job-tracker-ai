const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // ✅ get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // ✅ format: "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // store user info
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;