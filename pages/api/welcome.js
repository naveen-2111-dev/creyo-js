import ConnectDb from "@/lib/connect";

export default async function POST(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const collection = await ConnectDb();
    const user = await collection.signup.findOne({ email });
    

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const name = user.firstname;
    const role = user.role;
    const id = user._id

    return res.status(200).json({
      message: "user found",
      data: {
        name: name,
        role: role,
        id:id,

      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
