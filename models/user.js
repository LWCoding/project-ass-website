const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 16
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 180,
        default: "Hi! I'm a new user with no description. :)"
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    token: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    delete user._id
    delete user.token
    return user
}

userSchema.statics.findByCredentials = async function(username, password) {
    const user = await mongoose.models["User"].findOne({username})
    if (!user) {
        return {error: "Username or password is incorrect."}
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return {error: "Username or password is incorrect."}
    }
    return user
}

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET, {
        expiresIn: "10 minutes"
    })
    const refreshToken = jwt.sign({_id: this._id.toString()}, process.env.REFRESH_SECRET, {
        expiresIn: "60 days"
    })
    this.token = token
    this.refreshToken = refreshToken
    await this.save()
    return { token: token, refreshToken: refreshToken }
}

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})  

const userModel = mongoose.model("User", userSchema)

module.exports = userModel