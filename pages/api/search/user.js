import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";
import Fuse from "fuse.js";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { query, filter } = req.body; // query can be the name/category/skill or etc of the freelancer
      const db = await ConnectDb();
      const user = await db.freelancer.find({}).toArray();

      if (!user || user.length === 0) {
        return res.status(400).json({
          message: "No freelancers found",
        });
      }

      let fuseOptions = {};
      let fuse;

      if (filter === "rating") {
        fuseOptions = { keys: ["rating"] };
      } else if (filter === "skills") {
        fuseOptions = { keys: ["manual.skills"] };
      } else if (filter === "category") {
        fuseOptions = { keys: ["manual.fieldOfWork"] };
      } else if (filter === "freelancer") {
        fuseOptions = { keys: ["name"] };
      } else {
        return res.status(200).json({
          message: "success",
          data: user,
        });
      }

      fuse = new Fuse(user, fuseOptions);
      const results = fuse.search(query);

      if (results.length === 0) {
        return res.status(400).json({
          message: "No results found",
        });
      }

      console.log(results);
      return res.status(200).json({
        message: "Results found",
        data: results.map((result) => result.item),
      });
    } catch (error) {
      console.error("Error during user search:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}
