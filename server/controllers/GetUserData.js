const User = require("../models/UserModel");

// For returning user data after token is verified
const GetUser = async (req, res) => {
    const userId = req.id;

    try {
        const user = await User.findById(userId, "-password -is_verified -__v -createdAt -updatedAt");

        if (!user) {
            return res.status(400).json({ error: "Unable to find user" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return new Error(error);
    }
};

module.exports = {
    GetUser
}