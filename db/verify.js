export default async function Verify(email, otp, router) {
  try {
    const res = await fetch("api/otpverify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
      }),
    });
    if (!res.ok) {
      throw new Error("failed to fetch otp");
    }

    const data = await res.json();
    const verifyDbOtp = data.OTP;

    const response = await fetch("api/compare", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        otp: otp,
        verify: verifyDbOtp,
      }),
    });

    if (response) {
      router.push("/password");
      return;
    } else {
      router.push("/password");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
