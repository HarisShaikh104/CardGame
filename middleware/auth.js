const jwt = require('jsonwebtoken')
const { findOne } = require('../db/userData')
const User = require('../db/userData')
const key = require('../middleware/key')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verified = jwt.verify(token, key)
        const user = await User.findOne({ deviceId: verified.deviceId, token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        res.status(500).send({ error: 'Please Authenticate!' })
    }
}

module.exports = auth