import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(404).json({
          message: "email not found",
        });
      }

      const collection = await ConnectDb();
      const user = await collection.signup.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: "not signed-up",
        });
      }
      const posts = await collection.hire
        .find({ createdBy: user._id })
        .toArray();

      if (!posts) {
        return res.status(401).json({
          error: "failed to fetch the data",  
        });
      }

      return res.status(200).json({
        message: "Success",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
}
