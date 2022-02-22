const express = require("express")
const path = require("path")

accountRouter = express.Router()

accountRouter.post("/register", (req, res) => {
    console.log("Received!")
    console.log(req.body)
    return res.status(400).json({ // TODO: Send 200 if fail, 400 if okay
        msg: "This feature is a work in progress."
    })
})

module.exports = accountRouter