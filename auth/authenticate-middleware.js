/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization

  if (token) {
    const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!"

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // the token is invalid
        res.status(401).json({ message: "you cannot pass!" })
      } else {
        // the token is good
        req.jwt = decodedToken

        next()
      }
    })
  } else {
    res.status(400).json({ message: "You shall not pass!" })
  }
}
