import jwt from "jsonwebtoken";

export function userToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,                  // can't be accessed by JS (secure)
    sameSite: "none",                // allow cross-site (Vercel <-> Render)
    secure: true,                    // cookie only sent over HTTPS
  });

  return token;
}
