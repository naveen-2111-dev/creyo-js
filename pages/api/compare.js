export default function POST(req, res) {
  try {
    const { otp, verify } = req.body;

    if (!otp || !verify) {
      return res.status(401).json({
        message: "all fields are empty",
      });
    }
    if (verify === otp) {
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ success: false });
  } catch (err) {
    console.log(err);
  }
}
