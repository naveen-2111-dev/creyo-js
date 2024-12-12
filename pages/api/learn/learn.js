import ConnectDb from "@/lib/connect";
import isAuthenticated from "../Middleware/auth";
import transporter from "@/utils/transporter";

export default async function GET(req, res) {
  await isAuthenticated(req, res, async () => {
    try {
      if (!req.user?.email) {
        return res.status(401).json({
          error: "Sign up or log in first",
        });
      }

      const db = await ConnectDb();

      const freelancers = await db.freelancer.find({}).toArray();
      if (!freelancers || freelancers.length === 0) {
        return res.status(404).json({
          error: "No freelancers found",
        });
      }

      const skills = freelancers
        .filter((freelancer) => freelancer.manual?.skills)
        .flatMap((freelancer) => freelancer.manual.skills);

      const skillFrequency = skills.reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      }, {});

      const maxFrequency = Math.max(...Object.values(skillFrequency));

      const trendingSkills = Object.keys(skillFrequency).filter(
        (skill) => skillFrequency[skill] === maxFrequency
      );

      const usersWithoutTrendingSkills = freelancers
        .filter(
          (freelancer) =>
            !freelancer.manual?.skills.some((skill) =>
              trendingSkills.includes(skill)
            )
        )
        .map((freelancer) => freelancer.createdBy);

      const transport = await transporter();
      let users;

      usersWithoutTrendingSkills.forEach(async (userId) => {
        users = await db.signup.findOne({ _id: userId });
        if (!users || !users.email) {
          return res.status(400).json({
            error: "User not found",
          });
        }

        console.log(users.email);
        await transport.sendMail({
          from: '"Creyo" <noreply@gmail.com>',
          to: users.email,
          subject: "🌟 Trending Skills Update 🌟",
          html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          padding: 20px;
        }
        .header {
          position: relative;
          padding: 20px;
          background: #4caf50;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .confetti {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100px;
        }
        .message {
          padding: 20px;
        }
        .message p {
          color: #333;
        }
        .skills {
          margin: 10px 0;
          font-weight: bold;
          color: #4caf50;
        }
        .footer {
          margin-top: 20px;
          padding: 10px;
          font-size: 12px;
          color: #777;
          background: #f1f1f1;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="confetti"></div>
          <h1>🌟 Trending Skills Alert!</h1>
        </div>
        <div class="message">
          <p>Hi <strong>${users.firstname}</strong>,</p>
          <p>
            It seems you might be missing out on trending skills like:
          </p>
          <p class="skills">
          ${trendingSkills.join(", ")}</p>
          <p>
            Consider updating your skillset to stay competitive and unlock exciting opportunities!
          </p>
          <p>
            🚀 Let's make your profile shine!
          </p>
        </div>
        <div class="footer">
          Best regards, <br />
          Your Platform Team
        </div>
      </div>
    </body>
    </html>
  `,
        });
      });

      return res.status(200).json({
        message: "Freelancers fetched successfully",
        trendingSkills,
        usersWithoutTrendingSkills,
      });
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      return res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  });
}
