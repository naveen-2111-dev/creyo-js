import ConnectDb from "@/lib/connect";

export default async function POST(req, res) {
  try {
    const { Email } = req.body;
    if (!Email) {
      return res.status(401).json({
        error: "all fields are required",
      });
    }

    const db = await ConnectDb();
    const otp = await db.otp.findOne({ userid: Email });
    if (!otp) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    return res.status(200).json({
      message: "otp found successfully",
      OTP: otp.otp,
    });
  } catch (error) {
    console.log(error);
  }
}
