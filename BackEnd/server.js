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
const unverifiedRoute = require('./routes/admin/VerifyUsers.js')
const AccpetRoute = require('./routes/admin/AcceptUsers.js')
const trustRoute = require('./routes/users/trustuser.js')
const nearbyDonorRoute = require('./routes/users/nearbyDonors.js')
app.use('/pulseConnect-register', registerRoute)
app.use('/pulseConnect-Login', loginRoute)
app.use('/pulseConnect-userDetails', authMiddleware, profileRoute)
app.use('/verify-user', protectRoute)
app.use('/admin/unverified-users', unverifiedRoute)
app.use('/admin/accept-user', AccpetRoute)
app.use('/users/verified-users', trustRoute)
app.use('/users/nearby-donors', authMiddleware, nearbyDonorRoute)

app.listen(8800, () => {
    console.log("Server is Running on port 5000")
})