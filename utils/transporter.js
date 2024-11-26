import nodemailer from "nodemailer";

export default async function transporter() {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dev.naveen.rajan.m@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  return transport;
}
