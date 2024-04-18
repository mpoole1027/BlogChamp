const express = require('express')
const jsonwebtoken = require("jsonwebtoken")
const router = express.Router()

// add route for login verfication
router.post("/login", (req, res) => {
  const id = req.body?.id
  const password = req.body?.password
  const authToken = jsonwebtoken.sign({id, password}, "DUMMYKEY")

  res.cookie("authToken", authToken, {
    path: "/",
    maxAge: 24 * 60 * 60 * 1000, // sets the login duration for one day
    httpOnly: true,
  })

  res.sendStatus(200)
})

// check if cookie is valid to auto login
router.get("/autoLogin", (req, res) => {
    if (!req.cookies) {
        return res.sendStatus(401);
    }
    const authToken = req.cookies.authToken

    if (!authToken || authToken == null) {
        return res.sendStatus(401)
    }
    jsonwebtoken.verify(authToken, "DUMMYKEY", (err, decoded) => {
        if (err) {
            // Token is not valid or expired
            return res.sendStatus(401);
        } else {
            // Token is valid, user is authenticated
            return res.sendStatus(200);
        }
    });
})

// path to logout
router.get("/logout", (req, res) => {
    res.clearCookie("authToken")
    return res.sendStatus(200)
})

module.exports = router