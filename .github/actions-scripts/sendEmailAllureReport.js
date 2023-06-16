"use strict";
const nodemailer = require("nodemailer");
const currentDate = new Date();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const month = monthNames[currentDate.getMonth()];
const day = currentDate.getDate();

async function sendEmail() {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "protractor.user2@gmail.com",
            pass: "tibmlnfyijshoidz"
        },

    });


    let info = await transporter.sendMail({
        from: "protractor.user2@gmail.com",
        to: "senderovic.amina@gmail.com",
        subject: "Allure Report - All Tests",
        text: "Please find the Allure report for all tests at the following link: https://nucleus-reports.github.io/report_" + month + '_' + day + '/#suites'
    });
    console.log("Email sent");
}

sendEmail()
