const express = require('express')
require('./db/mongoose')
const User = require('./db/userData')
const userRouter=require('./controller/userData')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server Ready!')
})