module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.send(401).send({ message: "Not authorized" });
  }
  next();
};
