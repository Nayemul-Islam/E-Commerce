import jwt from "jsonwebtoken";

export class JwtToken {
  static generateToken(playload) {
    return jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  }
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}

