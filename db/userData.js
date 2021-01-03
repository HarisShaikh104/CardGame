const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const key = require('../middleware/key')

const userSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    uname: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true,
        default: 100
    },
    score: {
        type: Number,
        required: true,
        default: 100
    },
    dbDay: {
        type: Number,
        required: true,
        default: 1
    },
    dbDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    token: {
        type: String
    }
})

userSchema.methods.generateAuthKey = function () {
    const user = this
    const token = jwt.sign({ deviceId: user.deviceId }, key)

    return token
}

const UserData = mongoose.model('userData', userSchema)

module.exports = UserData