const sgMail = require("@sendgrid/mail");

const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
    recipient,
    sender,
    subject,
    html,
    text,
    attachments,
}) => {
    try {
        
        const from = sender || "contact@gmail.com";

        const msg = {
            to: recipient, // email recipient
            from: from, // this will be our verified sender
            subject,
            html: content,
            text: text,
            attachments,
        }

        return sgMail.send(msg);

    } catch (error) {
        console.log(error);
    }
}

exports.sendEmail = async (args) => {
    if(process.env.NODE_ENV === "development") {
        return new Promise.resolve();
    }
    else {
        return sendSGMail(args);
    }
}