const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

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
        const token = await user.generateAuthToken()
        await user.save()
        req.session.user = user
        req.session.token = token
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
        let token = await user.generateAuthToken()
        req.session.user = user
        req.session.token = token
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

accountRouter.get("/info", async (req, res) => {
    try {
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, "token": token})
        req.session.user = user
        if (!user) {
            throw new Error()
        }
        res.status(200).send(req.session.user)
    } catch (error) {
        res.status(400).send({error: "Not logged in!"})
    }
})

accountRouter.get("/logout", (req, res) => {
    req.session.destroy()
    res.status(200).send({})
})


module.exports = accountRouter