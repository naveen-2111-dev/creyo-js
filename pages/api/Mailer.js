import ConnectDb from "@/lib/connect";
import transporter from "@/utils/transporter";
import nodemailer from "nodemailer";

export default async function POST(req, res) {
  try {
    if (!req.body) {
      return res.status(404).json({
        message: "mail not given",
      });
    }
    const { email } = req.body;

    const collection = await ConnectDb();
    const user = await collection.signup.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "email not found",
      });
    }
    const transport = await transporter();

    await transport.sendMail({
      from: '"Creyo" <noreply@gmail.com>',
      to: email,
      subject: "Reset Your Password",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: black;
      margin: 0;
      padding: 0;
      color: white;
    }
    .email-container {
      color: white;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: black;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      color: white;
      margin-bottom: 20px;
    }
    .email-header h1 {
      font-size: 24px;
      margin: 0;
    }
    .email-body {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .email-body p {
      margin-bottom: 15px;
    }
    .reset-button {
      display: block;
      width: 200px;
      margin: 0 auto;
      background-color: #4CAF50;
      color: #fff;
      padding: 12px 0;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      font-size: 16px;
    }
    .email-footer {
      text-align: center;
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="email-body">
      <p>Mr/Mrs,</p>
      <p>We have received a request to reset the password for your account associated with this email address. If you did not initiate this request, please disregard this email. Your account remains secure.</p>
      <p>To proceed with resetting your password, please click the button below:</p>
      <a href="https://creyo-get2work.vercel.app/ResetPassword" class="reset-button" target="_blank">Reset Password</a>
    </div>
    <div class="email-footer">
      <p>If you need further assistance, please do not hesitate to <a href="mailto:support@creyo.com">contact our support team</a>.</p>
      <p>Best regards, <br> The Creyo Team</p>
    </div>
  </div>
</body>
</html>`,
    });

    res
      .status(200)
      .json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
}
