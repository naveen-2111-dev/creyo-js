export default function POST(req, res) {
  try {
    const { otp, verify } = req.body;

    if (!otp || !verify) {
      return res.status(401).json({
        message: "all fields are empty",
      });
    }

    if (verify === otp) {
      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
  }
}
