const jwt = require("jsonwebtoken");

// For logout user
const LogOut = (req, res) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
        return res.status(400).json({ error: "Couldn't find token" });
    }

    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({ error: "Authentication failed" });
        }

        res.clearCookie(`${"token"}`);
        req.cookies[`${"token"}`] = "";
        return res.status(200).json({ message: "Logged out successfully" });
    });
};

module.exports = { LogOut };