const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.session.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, "token": token})
        if (!user) {
            throw new Error()
        }
        return next()
    } catch (error) { // Cannot find user based on access token
        try {
            const refreshToken = req.session.refreshToken
            if (refreshToken) {
                const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
                const refreshUser = await User.findOne({_id: refreshDecoded._id})
                if (refreshUser) {
                    console.log("Generated new access token!")
                    let tokens = await refreshUser.generateAuthToken()
                    req.session.token = tokens.token
                    req.session.refreshToken = tokens.refreshToken
                    return next()
                }
            }
            res.status(401).send({error: "Not logged in!"})
        } catch (error) { // Refresh token is expired
            res.status(401).send({error: "Not logged in!"})
        }
    }
} 

module.exports = auth