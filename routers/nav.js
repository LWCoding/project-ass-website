const express = require("express")
const path = require("path")

const navRouter = express.Router()

navRouter.get("/changelogs", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/changelogs.html"))
})

navRouter.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"))
})

navRouter.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/account.html"))
})

module.exports = navRouter