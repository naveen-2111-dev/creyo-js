import ConnectDb from "@/lib/connect";
import transporter from "@/utils/transporter";

export default async function POST(req, res) {
  try {
    const { email, otp } = req.body;
    console.log("from server", email, otp);
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const db = await ConnectDb();

    const user = await db.signup.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "not an user",
      });
    }

    const data = await db.otp.insertOne({
      userid: email,
      otp: otp,
      createdAt: new Date(),
    });

    if (data.insertedId) {
      setTimeout(async () => {
        try {
          await db.otp.deleteOne({ _id: data.insertedId });
        } catch (dbError) {
          console.error("Error deleting OTP from database:", dbError);
        }
      }, 300000);

      const transport = await transporter();

      await transport.sendMail({
        from: '"Creyo" <noreply@gmail.com>',
        to: email,
        subject: "Your one time password",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>One-Time Password (OTP)</title>
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
      text-align: center; /* Center the content including the OTP */
    }
    .email-body p {
      margin-bottom: 15px;
    }
    .otp-box {
      display: inline-block;
      padding: 10px 20px;
      font-size: 18px;
      background-color: #4CAF50;
      color: #fff;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
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
      <h1>Your One-Time Password (OTP)</h1>
    </div>
    <div class="email-body">
      <p>Dear User,</p>
      <p>We received a request to verify your account or perform an action requiring additional security. Below is your One-Time Password (OTP):</p>
      <p class="otp-box">${otp}</p>
      <p>Please use this OTP within the next 5 minutes. If you did not initiate this request, please ignore this email or contact our support team immediately.</p>
    </div>
    <div class="email-footer">
      <p>If you need further assistance, please do not hesitate to <a href="mailto:nearcult@gmail.com">contact our support team</a>.</p>
      <p>Best regards, <br> The Creyo Team</p>
    </div>
  </div>
</body>
</html>
`,
      });

      return res.status(200).json({
        message: "OTP created and email sent successfully",
      });
    } else {
      return res.status(500).json({
        message: "Failed to insert OTP into database",
      });
    }
  } catch (error) {
    console.error("Error occurred during OTP creation:", error);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
}
