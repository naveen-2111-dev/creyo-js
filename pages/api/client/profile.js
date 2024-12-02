import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { company, type, likes, post, notification } = req.body;

      if (!company || !type || !likes || !post || !notification) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const db = await ConnectDb();
      const email = req.user.email;

      const user = await db.signup.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          error: "Please sign up first",
        });
      }

      const clientObj = {
        company,
        typeofcompany: type,
        likes,
        post,
        notification,
        createdBy: user._id,
      };

      const result = await db.Client.insertOne(clientObj);

      if (!result.acknowledged) {
        return res.status(500).json({
          message: "Failed to add data",
        });
      }

      return res.status(200).json({
        message: "Data added successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while processing your request",
      });
    }
  });
}
