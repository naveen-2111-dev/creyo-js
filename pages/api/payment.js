import connectDb from "@/lib/connect";
import isAuthenticated from "./Middleware/auth";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { transactiontype, amount, details } = req.body;
      const db = await connectDb();

      const email = req.user.email;
      console.log("User Email:", email);
      const user = await db.signup.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          message: "Signup first",
        });
      }

      const clientId = user._id;
      console.log("User ID:", clientId);

      // Ensure `clientId` is an ObjectId
      const clientObjectId = new ObjectId(clientId);
      const resp = await db.Client.findOne({
        createdBy: clientObjectId,
      });
        const crea = db.Client

      console.log(
        "Querying for Client Profile with createdBy:",
        clientObjectId
      );

      if (!resp) {
        console.log("Client profile not found with createdBy:", clientObjectId);
        return res.status(404).json({
          message: "Client profile not found",
        });
      }

      console.log("Client Profile Found:", resp);

      let newBalance = resp.wallet.walletBalance;

      if (transactiontype === "deposit") {
        newBalance += amount;
      } else if (transactiontype === "withdrawal") {
        if (newBalance < amount) {
          return res.status(400).json({
            message: "Insufficient balance",
          });
        }
        newBalance -= amount;
      } else {
        return res.status(400).json({
          message: "Invalid transaction type",
        });
      }

      await db.Client.updateOne(
        { _id: ObjectId(resp._id) },
        {
          $set: { "wallet.walletBalance": newBalance },
          $push: {
            "wallet.transactions": {
              type: transactiontype,
              amount: amount,
              details: details,
              timestamp: new Date(),
            },
          },
        }
      );

      return res.status(200).json({
        message: "Transaction successful",
        walletBalance: newBalance,
      });
    } catch (error) {
      console.error("Error processing transaction:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
}
