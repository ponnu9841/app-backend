import nodemailer from "nodemailer";
import { EMAIL, MAIL_PASSWORD, SMTP_HOST } from "@/config/env";

type MailOptions = {
    to: string;
    subject: string;
    text: string;
    html?: string;
};

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: MAIL_PASSWORD,
    },
});

export const sendMail = async ({ to, subject, text, html }: MailOptions) => {
    if (!EMAIL || !MAIL_PASSWORD) {
        throw new Error("Email configuration is missing");
    }

    await transporter.sendMail({
        from: EMAIL,
        to,
        subject,
        text,
        html,
    });
};
