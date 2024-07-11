const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// For Login
const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check if email exist
        const user = await User.findOne({ email: email.toLowerCase() });

        // if email exist compare password from the stored password password
        if (user) {
            // compare password with stored hashed password
            const checkPassword = bcrypt.compareSync(password, user.password);

            // if password not matched
            if (!checkPassword) {
                return res.status(200).json({ error: "Invalid Email / Password" });
            }

            // if password matched and account is verified create web token
            if (user.is_verified === true) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: 3 * 24 * 60 * 60,
                });

                // clearing cookies if already exist
                if (req.cookies[`${"token"}`]) {
                    req.cookies[`${"token"}`] = "";
                }

                // creating cookie for web token
                res.cookie("token", token, {
                    path: "/",
                    expires: new Date(Date.now() + 86400000),
                    secure: true,
                    httpOnly: true,
                    sameSite: "None",
                });

                return res.status(200).json({ message: "Logged in successfully" });
            }

            // if user email is not verified
            else if (user.is_verified === false) {
                await User.deleteOne({ _id: user._id });
                return res.status(200).json({ error: "Invalid Email / Password" });
            }
        }
        // if email not exist return user not found
        else {
            return res.status(200).json({ error: "Invalid Email / Password" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    Login
}