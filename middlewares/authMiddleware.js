import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    console.warn(`Auth failure - missing or malformed Authorization header for ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.warn(`Auth failure - invalid token for ${req.method} ${req.originalUrl}: ${err.message}`);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
