import { JwtToken } from "./jwt.token.js";

const checkToken = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res
        .status(403)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authorization.split(" ")[1];
    const decoded = JwtToken.verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    next();

  } catch (error) {
    next(error.message);
  }
};

export default checkToken;
