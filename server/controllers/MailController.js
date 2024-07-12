const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const transporter = nodemailer.createTransport({
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

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        // Appears in header & footer of e-mails
        name: "LoginAuth",
        link: process.env.ORIGIN_VALUE,
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    },
});

module.exports =  { transporter, mailGenerator };