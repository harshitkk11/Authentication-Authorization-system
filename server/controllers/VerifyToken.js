const jwt = require("jsonwebtoken");

// For verifing generated token
const VerifyToken = (req, res, next) => {
    try {

        const cookies = req.headers.cookie; // get generated cookie
        const token = cookies.split("=")[1]; //get token from cookie

        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }
        jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(400).json({ error: "Invalid Token" });
            }
            req.id = user.id;
        });
        next();
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

module.exports = { VerifyToken }