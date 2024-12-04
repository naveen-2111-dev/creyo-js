import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";

export default async function POST(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      const {
        name,
        pronoun,
        Experience,
        goal,
        fieldOfWork,
        skills,
        role,
        experience,
        sslc,
        Hsc,
        university,
        link,
        content,
        location,
        dob,
        language,
        dno,
        street,
        city,
        state,
        pincode,
        payment,
      } = req.body;

      // console.log({
      //   Name: name,
      //   Pronoun: pronoun,
      //   Experience: Experience,
      //   Goal: goal,
      //   FieldOfWork: fieldOfWork,
      //   Skills: skills,
      //   Role: role,
      //   ExperienceDetails: experience,
      //   SSLC: sslc,
      //   HSC: Hsc,
      //   University: university,
      //   Link: link,
      //   language:language,
      //   Content: content,
      //   Location: location,
      //   DateOfBirth: dob,
      //   Dno: dno,
      //   Street: street,
      //   City: city,
      //   State: state,
      //   Pincode: pincode,
      //   payment: payment
      // });

      if (
        !name ||
        !pronoun ||
        !Experience ||
        !language||
        !goal ||
        !fieldOfWork ||
        !skills ||
        !role ||
        !experience ||
        experience.length === 0 ||
        !sslc ||
        !Hsc ||
        !university ||
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
      const user = await collection.signup.findOne({ email: req.user.email });

      if (!user) {
        return res.status(401).json({ message: "User not signed up" });
      }

      const id = user._id;
      const newFreelancer = {
        name,
        pronoun,
        Experience,
        goal,
        manual: {
          fieldOfWork,
          skills,
          role,
          experience: experience.map((exp) => ({
            placeofWork: exp.placeofWork,
            company: exp.company,
            Location: exp.Location,
            start: new Date(exp.start),
            present: exp.present,
            description: exp.description,
          })),
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
        return res.status(400).json({ error: "Failed to add data" });
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
