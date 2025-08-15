import nodemailer from "nodemailer";

export const sendOTPEmail=async(to, subject, html)=>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"Auth Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

