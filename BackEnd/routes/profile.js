const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
router.post('/', async(req, res) => {
    try {

        let user = jwt.verify(req.cookies.token, "ciagrette")
        await userModel.updateOne({ _id: user.id }, req.body)
        return res.status(200).json({
            success: true,
            message: "Profile Submitted For Verification"
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong"
        })

    }
})
module.exports = router