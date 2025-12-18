import jwt from "jsonwebtoken";

class JwtToken {
  generateToken(playload) {
    return jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  }
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}

export const jwtToken = new JwtToken();
