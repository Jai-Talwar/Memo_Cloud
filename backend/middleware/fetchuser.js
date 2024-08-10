var jwt = require("jsonwebtoken");
const JWT_SECRET = "jaiTalwar";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send({
      status: 401,
      json: "Bad request please authenticate with valid token",
    });
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET);

      req.userId = data.userId;

      next();
    } catch (error) {
      res.send({
        status: 401,
        json: "internal server error",
        error: error,
      });
    }
  }
};
module.exports = fetchuser;
