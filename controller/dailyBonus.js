const express = require('express')
const User = require('../db/userData')
const router = express.Router()

const dailyBonus = async (user) => {
    const bonuses = [50, 150, 300, 400, 500, 750, 1000]
    const currDate = new Date()
    const currUser = { deviceId: user.deviceId }
    const oldDate = user.dbDate
    const oneDay = 60 * 60 * 24 * 1000
    const updQuery = { dbDate: currDate, coins: (user.coins + bonuses[user.dbDay]), dbDay: user.dbDay + 1 }
    var updatedUser = user

    if ((currDate - oldDate) > oneDay) {

        updatedUser = await User.findOneAndUpdate(currUser, updQuery, { new: true })

        if (updatedUser.dbDay > '6') {
            updatedUser = await User.findOneAndUpdate(currUser, { dbDay: 0 }, { new: true })
        }
    }

    const updUser = updatedUser.toObject()
    delete updUser.token
    delete updUser._id
    delete updUser.deviceId
    delete updUser.score

    return updUser
}

module.exports = dailyBonus