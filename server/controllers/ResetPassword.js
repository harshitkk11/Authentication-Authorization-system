const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transporter, mailGenerator } = require("./MailController");

const ResetMail = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            if (user.is_verified === true) {
                next()
                return
            }
            
            return res.status(200).json({ error: "This email address is not verified" });
        }

        return res.status(200).json({ error: "This email address is not registered" });

    } catch (error) {
        return res.status(400).json({ error });
    }
};

const ResetMailer = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "300s",
            });
        }

        var emailData = {
            body: {
                name: user.name,
                intro:
                    "We have received a request to reset your account password associated with this email address. If you have not placed this request, you can ignore this email and we assure you that your account is completely secure.",
                action: {
                    instructions:
                        "If you do need to change your password, you can use the link given below.",
                    button: {
                        color: "#3498db", // Optional action button color
                        text: "Reset Password",
                        link: "http://localhost:5173/reset?t=" + token + "",
                    },
                },
            },
        };

        var emailBody = mailGenerator.generate(emailData);

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
                return res.status(200).json({ message: "Reset email sent" });
            }
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

const ResetPass = async (req, res) => {
    const { password, token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token not found" });
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(400).json({ error: "Invalid Token" });
        }

        try {
            const hashedpassword = bcrypt.hashSync(password);

            const reset = await User.findByIdAndUpdate(
                { _id: user.id },
                { $set: { password: hashedpassword } }
            );

            if (reset) {
                return res.status(200).json({ message: "Password reset Successfully." });
            } else {
                return res.status(400).json({ error: "Something went wrong" });
            }
        } catch (error) {
            return res.status(400).json({ error });
        }
    });
};


module.exports = {
    ResetMail,
    ResetMailer,
    ResetPass
}