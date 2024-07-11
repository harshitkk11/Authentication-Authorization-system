const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transporter, mailGenerator } = require("./MailController");

// For account creation (Signup)
const Signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    //   check if email already exist
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    const existingUsername = await User.findOne({ username: username })

    // if username or email not exist then create new user
    if (!existingEmail && !existingUsername) {
      const hashedPassword = bcrypt.hashSync(password); // password hashing

      // creates new user
      const newUser = new User({
        name,
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      const userData = await newUser.save();

      if (userData) {
        next();
      } else {
        return res.status(200).json({ error: "Something went wrong" });
      }
    }

    // else return already exist message
    else if (existingUsername) {
      return res.status(200).json({ message: "Username already exist" })
    }
    else if (existingEmail) {
      return res.status(200).json({ message: "Email already exist" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// For Sending Verification Email to User
const verifyMailer = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3600s",
      });
    }

    var emailData = {
      body: {
        name: name,
        intro: "Thank you for signing up,",
        action: {
          instructions:
            "To get started, please click here to confirm your account:",
          button: {
            color: "#3498db", // Optional action button color
            text: "Confirm your account",
            link: "http://localhost:5173/verify?t=" + token + "",
          },
        },
      },
    };

    var emailBody = mailGenerator.generate(emailData);

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email verification",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, ((err, data) => {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        return res.status(200).json({
          message: "Signed up successfully",
        });
      }
    }));
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// For email verification
const verifyMail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token not found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, async (err, user) => {

    if (err) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    try {
      const verification = await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: { is_verified: true } }
      );
      if (verification) {
        return res.status(200).json({ message: "Email verified successfully." });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

module.exports = { Signup, verifyMailer, verifyMail }