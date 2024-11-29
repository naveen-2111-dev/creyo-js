import { serialize } from "cookie";

export default function POST(req, res) {
  try {
    const { otp, verify, email } = req.body;
    console.log(otp, verify, email);
    if (!otp || !verify || !email) {
      return res.status(401).json({
        message: "all fields are empty",
      });
    }
    if (verify === otp) {
      res.setHeader(
        "Set-Cookie",
        serialize("email", email, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 10 * 60,
        })
      );
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ success: false });
  } catch (err) {
    console.log(err);
  }
}
