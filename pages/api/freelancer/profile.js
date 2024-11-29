import isAuthenticated from "../Middleware/auth";
import ConnectDb from "@/lib/connect";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const {
        exprience,
        goal,
        tellAbout,
        manual: {
          fieldOfWork,
          skills,
          role,
          experience: {
            placeofWork,
            company,
            Location,
            start,
            present,
            description,
          },
          education: { sslc, Hsc, university },
          language,
          bio: { link, content },
          payment,
          location,
          dob,
          address: { dno, street, city, state, pincode },
        },
      } = req.body;

      if (
        !exprience ||
        !["new", "intermediate", "expert"].includes(exprience) ||
        !goal ||
        !["earn", "experience", "sideincome"].includes(goal) ||
        !tellAbout ||
        !fieldOfWork ||
        !skills ||
        !Array.isArray(skills) ||
        skills.length === 0 ||
        !role ||
        !placeofWork ||
        !company ||
        !Location ||
        !start ||
        !present ||
        !description ||
        !sslc ||
        !Hsc ||
        !university ||
        !language ||
        !link ||
        !content ||
        !payment ||
        !location ||
        !dob ||
        !dno ||
        !street ||
        !city ||
        !state ||
        !pincode
      ) {
        return res
          .status(400)
          .json({ error: "All fields are required and must be valid" });
      }

      const collection = await ConnectDb();
      console.log(req.user)
      const user = await collection.signup.findOne({
        email: req.user.email,
      });
      if (!user) {
        return res.status(401).json({
          message: "not signed-up",
        });
      }

      const id = user._id;

      const newFreelancer = {
        exprience,
        goal,
        tellAbout,
        manual: {
          fieldOfWork,
          skills,
          role,
          experience: {
            placeofWork,
            company,
            Location,
            start: new Date(start),
            present: new Date(present),
            description,
          },
          education: {
            sslc,
            Hsc,
            university,
          },
          language,
          bio: {
            link,
            content,
          },
          payment,
          location,
          dob: new Date(dob),
          address: {
            dno,
            street,
            city,
            state,
            pincode,
          },
        },
        createdBy: id,
        createdAt: new Date(),
      };

      const result = await collection.freelancer.insertOne(newFreelancer);

      if (!result) {
        return res.status(400).json({
          error: "Failed to add data",
        });
      }

      return res.status(201).json({
        message: "Freelancer profile created successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  });
}
