const express = require("express")
const cors = require("cors")
const db = require('./config/mongoose.js')
const cookiepareser = require('cookie-parser')
const authMiddleware = require('./middlewares/authMiddleware.js')


const app = express();
app.use(cookiepareser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const registerRoute = require('./routes/register.js')
const loginRoute = require('./routes/Loginn.js')
const profileRoute = require('./routes/profile.js')
const protectRoute = require('./routes/protected.js')
app.use('/pulseConnect-register', authMiddleware, registerRoute)
app.use('/pulseConnect-Login', authMiddleware, loginRoute)
app.use('/pulseConnect-userDetails', authMiddleware, profileRoute)
app.use('/verify-user', protectRoute)

app.listen(8800, () => {
    console.log("Server is Running on port 5000")
})