export default function Otpgenerator() {
  const digits =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let otp = "";
  for (let index = 0; index < 6; index++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}
