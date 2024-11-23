import jwt from "jsonwebtoken";

export default async function isAuthendicated(req, res, next) {
  try {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token === null) {
      return res.status(401);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(401);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
}
