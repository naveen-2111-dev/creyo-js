import jwt from "jsonwebtoken";

export default async function isAuthendicated(req, res, next) {
  try {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err && err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.Token;
        if (!refreshToken) {
          return res.status(403).json({
            error: "missing refresh token",
          });
        }

        jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET_KEY,
          (err, decode) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }

            const newAccessToken = jwt.sign(
              {
                sub: decode.sub,
                email: decode.email,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );
            localStorage.setItem("AccessToken", newAccessToken);
          }
        );
      }
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
}
