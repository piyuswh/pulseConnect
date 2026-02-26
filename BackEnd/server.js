const express = require("express")
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/Loginn.js')

app.use('/pulseConnect-register', registerRoute)
app.use('/pulseConnect-Login', loginRoute)

app.listen(3000, () => {
    console.log("Server is Running on port 5000")
})