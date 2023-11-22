const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const User = require("../models/userModel");

var transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: "587",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

var mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "LoginAuth",
    link: "https://loginauthsys.vercel.app/",
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const verifyMailer = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      var id = user._id;
    }

    var emailData = {
      body: {
        name: name,
        intro: "Thank you for signing up,",
        action: {
          instructions:
            "To get started, please click here to confirm your account:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: "http://localhost:5173/verifymail?id=" + id + "",
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

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        return res.status(200).json({
          message: "Signed up successfully",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const resetMailer = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    var emailData = {
      body: {
        name: user.name,
        intro:
          "We have received a request to reset your account password associated with this email address. If you have not placed this request, you can ignore this email and we assure you that your account is completely secure.",
        action: {
          instructions:
            "If you do need to change your password, you can use the link given below.",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Reset Password",
            link: "http://localhost:5173/resetpass?id=" + user._id + "",
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

    transporter.sendMail(mailOptions, function (err, data) {
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

module.exports = { verifyMailer, resetMailer };
