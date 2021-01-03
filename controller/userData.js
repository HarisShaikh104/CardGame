const express = require('express')
const User = require('../db/userData')
const router = express.Router()
const auth = require('../middleware/auth')
const dailyBonus = require('../controller/dailyBonus')

router.post('/user/login', async (req, res) => {
    try {
        const userToSave = new User(req.body)
        const token = await userToSave.generateAuthKey()
        const user = await User.findOne({ deviceId: req.body.deviceId })

        if (!user) {
            userToSave.token = token
            await userToSave.save()
            res.send(userToSave)
        }

        const updatedUser = await User.findOneAndUpdate({ deviceId: user.deviceId }, { token }, { new: true })
        res.send(updatedUser)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.token = ''
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/user/dailybonus', auth, async (req, res) => {
    try {
        const user = await dailyBonus(req.user)
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

module.exports = router