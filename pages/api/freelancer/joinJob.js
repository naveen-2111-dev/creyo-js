import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";
import { ObjectId } from "mongodb";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { Amount, job } = req.body;
      const db = await ConnectDb();
      const user = await db.signup.findOne({ email: req.user.email });
      if (!user) {
        return res.status(401).json({
          message: "user did not signup",
        });
      }
      const Obj = {
        job: job,
        freelancerId: user._id,
        amount: Amount,
      };

      const jobdb = await db.hire.findOne({ _id: new ObjectId(job) });
      if (!jobdb) {
        return res.status(401).json({
          message: "no job found",
        });
      }

      const compare = await db.bid.findOne({ freelancerId: user._id });
      if (compare) {
        return res.status(400).json({
          message: "user alredy exists",
        });
      }

      const result = await db.bid.insertOne(Obj);
      if (!result.insertedId) {
        return res.status(400).json({
          error: "failed to add bid",
        });
      }

      return res.status(200).json({
        message: "bid added successfully",
        data: `bid on ${jobdb.title} made successfuly`,
      });
    } catch (error) {
      console.log(error);
    }
  });
}
