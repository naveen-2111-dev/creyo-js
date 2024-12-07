//searching a post with some filters ir.. for lancers

import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";
import Fuse from "fuse.js";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const { query, proposals, rating } = req.body;

      if (!query) {
        return res.status(401).json({
          message: "Query not found",
        });
      }

      const db = await ConnectDb();
      const post = await db.hire.find({}).toArray();

      if (!post || post.length === 0) {
        return res.status(400).json({
          message: "No posts found",
        });
      }

      const options = {
        keys: ["title", "description.content"],
      };

      const fuse = new Fuse(post, options);

      let result = fuse.search(query);
      if (rating) {
        result = result.filter(
          (highrate) => highrate.item.rating >= 1 && highrate.item.rating <= 5
        );
      }

      if (proposals) {
        result = result.filter((proposers) => proposers.item.proposers >= 10);
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "No results found",
        });
      }

      return res.status(200).json({
        message: "Success",
        result: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occurred while processing the search",
      });
    }
  });
}
