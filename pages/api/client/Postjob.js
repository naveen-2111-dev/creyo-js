import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const {
        title,
        skill,
        scope,
        month,
        experience,
        worktime,
        from,
        to,
        charge,
        link,
        content,
      } = req.body;

      if (
        !title ||
        !skill ||
        !scope ||
        !month ||
        !experience ||
        !worktime ||
        !from ||
        !to ||
        !charge ||
        !link ||
        !content
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const collection = await ConnectDb();
      const checkUser = await collection.signup.findOne({
        email: req.user.email,
      });

      if (!checkUser) {
        return res.status(401).json({
          message: "user not signedup",
        });
      }
      const objId = checkUser._id;

      const post = await collection.hire.insertOne({
        title: title,
        skill: skill,
        scope: scope,
        month: month,
        experience: experience,
        workTime: worktime,
        budget: {
          from: from,
          to: to,
        },
        charge: charge,
        description: {
          link: link,
          content: content,
        },
        createdBy: objId,
      });

      if (post.insertedId === 0) {
        return res.status(401).json({
          error: "failed to add data",
        });
      }

      return res.status(200).json({
        message: "data added",
      });
    } catch (error) {
      return res.status(400).json({
        error: "failed to add data",
      });
    }
  });
}
