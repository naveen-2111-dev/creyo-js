import ConnectDb from "@/lib/connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function POST(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "all fields are empty",
      });
    }

    const db = await ConnectDb();
    const User = await db.signup.findOne({ email });
    if (!User) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "incorrect password",
      });
    }

    const Token = jwt.sign(
      {
        sub: User._id,
        email: User.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(Token);

    const RefreshToken = jwt.sign(
      {
        sub: User._id,
        email: User.email,
      },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("Token", RefreshToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      })
    );

    const updateFields = { role: role };

    if (role === "freelancer") {
      updateFields.freelancerProfile = User._id;
    } else if (role === "client") {
      updateFields.hiringClientProfile = User._id;
    }

    const signuSet = await db.signup.updateOne(
      { email },
      { $set: updateFields }
    );

    return res.status(200).json({
      message: "login successfull",
      AccessToken: Token,
    });
  } catch (error) {
    console.log(error);
  }
}
