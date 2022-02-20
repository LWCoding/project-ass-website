const express = require("express")
const path = require("path")

navRouter = express.Router()

navRouter.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/contact.html"))
})

navRouter.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"))
})

module.exports = navRouter