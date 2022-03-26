const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
const auth = require("../middleware/auth.js")

const accountRouter = express.Router()

accountRouter.post("/register", async (req, res) => {
    try {
        let existingUser = await User.findOne({username: req.body.username})
        if (existingUser != null) {
            return res.status(400).send({msg: "That username is already taken!"})
        }
        let user = new User({
            username: req.body.username,
            password: req.body.password
        })
        let tokens = await user.generateAuthToken()
        req.session.user = user
        req.session.token = tokens.token
        req.session.refreshToken = tokens.refreshToken
        if (req.body.remember == "true") {
            let date = new Date()
            let cookieExpiryDate = new date(date.getFullYear() + 1, date.getMonth(), date.getDay())
            req.session.cookie.expires = cookieExpiryDate
        } else {
            req.session.cookie.expires = false
        }
        res.status(200).send({})
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg: "Your request failed to process. This may be a server-side issue."})
    }
})

accountRouter.post("/login", async (req, res) => {
    try {
        let user = await User.findByCredentials(req.body.username, req.body.password)
        if (user.error) {
            return res.status(400).send({msg: "Provided username and password not found in database."})
        }
        let tokens = await user.generateAuthToken()
        req.session.user = user
        req.session.token = tokens.token
        req.session.refreshToken = tokens.refreshToken
        if (req.body.remember === "true") {
            let date = new Date()
            let cookieExpiryDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay())
            req.session.cookie.expires = cookieExpiryDate
        } else {
            req.session.cookie.expires = false
        }
        res.status(200).send({})
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg: "Your request failed to process. This may be a server-side issue."})
    }
})

accountRouter.get("/info", auth, async (req, res) => {
    res.status(200).send(req.session.user)
})

accountRouter.patch("/update", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["username", "description"]
    const isValidOperator = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperator) {
        return res.status(400).send("Invalid updates.")
    }
    try {
        let existingUser = await User.findOne({username: req.body.username})
        if (existingUser != null) {
            return res.status(400).send({msg: "That username is already taken!"})
        }
        updates.forEach((update) => req.session.user[update] = req.body[update])
        let currentUser = await User.findOne({refreshToken: req.session.user.refreshToken})
        await currentUser.save()
        res.status(200).send(req.session.user)
    } catch (error) {
        console.log(error)
        res.status(400).send({msg: "Your request failed to process. This may be a server-side issue."})
    }
})

accountRouter.post("/logout", (req, res) => {
    req.session.destroy()
    res.status(200).send({})
})


module.exports = accountRouter