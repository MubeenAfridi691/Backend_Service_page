const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');

const Authware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '1234567');
        req.user = decoded;

        const userdata = await usermodel.findById(decoded.userId);
        if (!userdata) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log(userdata);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = Authware;
