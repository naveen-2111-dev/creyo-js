import ConnectDb from "@/lib/connect";
import { serialize } from "cookie";

export default async function POST(req, res) {
  try {
    const { newpassword, confirmpassword, email } = await req.body;
    if (!newpassword || !confirmpassword || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const db = await ConnectDb();

    const updateResult = await db.signup.updateOne(
      { email },
      { $set: { password: newpassword } }
    );

    if (updateResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no change made" });
    }

    res.setHeader(
      "Set-Cookie",
      serialize("email", email, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
      })
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
