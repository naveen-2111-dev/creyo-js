import transporter from "@/utils/transporter";
import isAuthenticated from "../Middleware/auth";
import ConnectDb from "@/lib/connect";
import Otpgenerator from "@/utils/otpgen";

export default async function POST(req, res) {
  isAuthenticated(req, res, async () => {
    try {
      const email = req.user.email;

      if (!email) {
        return res.status(401).json({ error: "Email not found" });
      }

      const db = await ConnectDb();
      const existingOtp = await db.otp.findOne({ userid: email });

      if (existingOtp) {
        return res.status(400).json({ message: "OTP already exists" });
      }

      const otp = Otpgenerator();
      const response = await db.otp.insertOne({ userid: email, otp });

      if (!response.insertedId) {
        return res.status(500).json({ error: "Failed to save OTP" });
      }

      const transport = await transporter();
      const mailOptions = {
        from: '"Creyo" <noreply@gmail.com>',
        to: email,
        subject: "Verify Your Email Address for Creyo",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .email-container {
                    max-width: 600px;
                    margin: 30px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 24px;
                    font-weight: bold;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h1 {
                    color: #333333;
                }
                .content p {
                    color: #555555;
                    line-height: 1.5;
                }
                .otp {
                    display: inline-block;
                    font-size: 24px;
                    color: #ffffff;
                    background: #007bff;
                    padding: 10px 20px;
                    border-radius: 4px;
                    text-decoration: none;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">Creyo</div>
                <div class="content">
                    <h1>Verify Your Email Address</h1>
                    <p>Thank you for signing up with Creyo! To complete your registration, please verify your email address using the one-time password below:</p>
                    <p class="otp">${otp}</p>
                    <p>If you did not request this email, you can safely ignore it.</p>
                </div>
                <div class="footer">&copy; 2024 Creyo. All rights reserved.</div>
            </div>
        </body>
        </html>
        `,
      };

      transport.sendMail(mailOptions, async (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send email" });
        }

        setTimeout(async () => {
          try {
            await db.otp.deleteOne({ _id: response.insertedId });
            console.log("OTP deleted successfully after timeout");
          } catch (deleteError) {
            console.error("Error deleting OTP:", deleteError);
          }
        }, 300000);

        return res.status(200).json({ message: "OTP sent successfully" });
      });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
