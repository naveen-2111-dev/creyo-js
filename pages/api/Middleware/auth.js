import { serialize } from "cookie";
import jwt, { decode } from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
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
            error: "Missing refresh token",
          });
        }

        jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET_KEY,
          (err, decoded) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" });
            }

            console.log(decoded.sub, decoded.email);

            const newAccessToken = jwt.sign(
              { sub: decoded.sub, email: decoded.email },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );

            res.setHeader("Authorization", `Bearer ${newAccessToken}`);
            res.setHeader(
              "Set-Cookie",
              serialize("accessToken", newAccessToken, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
              })
            );
            req.user = decoded;
            next();
          }
        );
      } else if (user) {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.error("Authentication Error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
