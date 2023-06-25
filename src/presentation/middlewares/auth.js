import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ message: "Empty authentication header!" });
  }

  const token = authHeader.split(" ")[1]; // Bearer tokenString

  jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
    if (error) return response.status(403).send({ error: "Authentication error" });

    request.user = credentials.user;
    next();
  });
};
export default auth;
