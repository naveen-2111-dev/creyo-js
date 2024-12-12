import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function (req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const db = await ConnectDb();
      console.log("Database connection established");

      const payments = await db.Payment.find({}).toArray();

      return res.status(200).json({
        message: "Payments fetched successfully",
        payments: payments,
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      return res.status(500).json({
        message: "Error fetching payments",
        error: error.message,
      });
    }
  });
}
