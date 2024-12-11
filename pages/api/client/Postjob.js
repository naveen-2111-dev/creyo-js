import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";
import transporter from "@/utils/transporter";

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
        //!link ||
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
          message: "User not signed up",
        });
      }
      const objId = checkUser._id; // user id

      const freelancerskills = await collection.freelancer.find({}).toArray();

      const matches = freelancerskills.map((freelancer) => {
        const freelancerSkills = Array.isArray(freelancer.manual?.skills)
          ? freelancer.manual.skills
          : [];
        const matchedSkills = freelancerSkills.filter((lancerSkill) =>
          skill.includes(lancerSkill)
        );
        const matchPercentage = (matchedSkills.length / skill.length) * 100;
        return {
          created: freelancer.createdBy,
          matchPercentage,
          matchedSkills,
        };
      });
      const filteredMatches = matches.filter(
        (match) => match.matchPercentage > 0
      );

      const id = filteredMatches.map((id) => id.created);

      const user = await collection.signup.find({ _id: { $in: id } }).toArray();
      const userEmails = user.map((user) => ({
        _id: user._id,
        email: user.email,
        name: user.firstname,
      }));

      const post = await collection.hire.insertOne({
        title,
        skill,
        scope,
        month,
        experience,
        workTime: worktime,
        budget: {
          from,
          to,
        },
        charge,
        description: {
          link,
          content,
        },
        createdBy: objId,
      });

      if (!post.insertedId) {
        return res.status(401).json({
          error: "Failed to add data",
        });
      }

      const transport = await transporter();

      userEmails.forEach(async (freelancer) => {
        const mailOptions = {
          from: '"Creyo" <noreply@gmail.com>',
          to: freelancer.email,
          subject: "New Job Opportunity Matching Your Skills",
          html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              margin: 20px;
            }
            .header {
              font-size: 20px;
              color: #333;
            }
            .content {
              font-size: 16px;
              color: #555;
            }
            .button {
              background-color: #007BFF;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="header">New Job Opportunity for You!</p>
            <p class="content">Hello ${freelancer.name},</p>
            <p class="content">We found a job that matches your skills! Here are the details:</p>
            <table>
              <tr>
                <td><strong>Job Title</strong></td>
                <td>${title}</td>
              </tr>
              <tr>
                <td><strong>Scope</strong></td>
                <td>${scope}</td>
              </tr>
              <tr>
                <td><strong>Budget</strong></td>
                <td>${from} - ${to}</td>
              </tr>
              <tr>
                <td><strong>Experience</strong></td>
                <td>${experience} years</td>
              </tr>
            </table>
            <a href="https://creyo-get2work.vercel.app/MyJob" class="button">View Job Details</a>
            <p class="content">Don't miss this opportunity! Apply now!</p>
          </div>
        </body>
      </html>
    `,
        };

        await transport.sendMail(mailOptions);
      });

      return res.status(200).json({
        message: "Job posted and notifications sent",
        filteredMatches,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to add data",
      });
    }
  });
}
