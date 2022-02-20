const express = require("express")
const path = require("path")

navRouter = express.Router()

navRouter.get("/changelogs", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/changelogs.html"))
})

navRouter.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"))
})

module.exports = navRouter