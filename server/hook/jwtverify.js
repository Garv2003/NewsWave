import jwt from "jsonwebtoken";
import User from "../model/user.js";

async function jwtverify(req, res) {
  if (req.raw.url === "/login" || req.raw.url === "/register") {
    return;
  }

  const token = req.headers.authorization;
  if (!token) {
    res.code(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.code(401).send({ message: "No user found with this token" });
    }
    req.user = user;
    await asyncMethod();
  } catch (err) {
    res.code(401).send({ message: "Token is not valid" });
  }
}

export { jwtverify };
