import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { otp } = req.body;
      const email = req.user.email;
      const db = await ConnectDb();
      const response = await db.otp.findOne({ userid: email });

      if (!response) {
        return res.status(400).json({
          message: "OTP not found. Please request a new one.",
        });
      }

      if (otp !== response.otp) {
        return res.status(400).json({
          failed: false,
        });
      }

      const OTP_VALID_DURATION = 5 * 60 * 1000;
      const now = new Date();
      const otpCreatedAt = response.createdAt;
      if (now - otpCreatedAt > OTP_VALID_DURATION) {
        await db.otp.deleteOne({ userid: email });
        return res.status(400).json({
          failed: false,
        });
      }

      await db.otp.deleteOne({ userid: email });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({
        message: "An error occurred while verifying the OTP.",
      });
    }
  });
}
