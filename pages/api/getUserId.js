// pages/api/getUserId.js
import ConnectDb from "../../lib/connect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    try {
      await ConnectDb();

      const user = await User.findOne({ name }); // Replace with your DB query
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ _id: user._id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
