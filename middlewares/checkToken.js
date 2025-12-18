import { jwtToken } from "../auth/jwt.token.js";
const checkToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  try {
    if (!authorization) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwtToken.verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    next();

  } catch (error) {
    next(error.message);
  }
};

export default checkToken;
