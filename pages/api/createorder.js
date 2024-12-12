import Razorpay from "razorpay";

export default async function (req, res) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount: 100 * 100,
      currency: "INR",
      receipt: "reciept_" + Math.random().toString(36).substring(7),
    });

    return res.status(200).json({
      message: "successfull",
    });
  } catch (error) {
    console.log(error);
  }
}
