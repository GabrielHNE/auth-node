const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  
  const authHeader = req.headers.Authorization;

  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "secret");

    req.userId = decoded.id;

    return next();
  } catch (err) {
    // console.log("entrou no catch");
    // return res.status(401).send({ error: "Token invalid" });
    const erro = new Error("Invalid Token!");
    erro.status = 401;
    next(erro);
  }
  return res.sendStatus(200);
};