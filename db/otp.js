import Otpgenerator from "@/utils/otpgen";

export default async function OtpSaver(email) {
  try {
    const otp = Otpgenerator();
    console.log("db",email, otp);
    const res = await fetch("api/otp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otp,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
