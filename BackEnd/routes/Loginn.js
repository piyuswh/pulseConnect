const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const usermodel = require('../models/userModel')
const bcrypt = require('bcrypt')
router.post('/', async(req, res) => {
    try {
        let { password, email } = req.body
        const user = await usermodel.findOne({ email: email })
        if (!user)
            return res.status(400).json({
                success: false,
                message: "User not found"
            });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({
                success: false,
                message: "User not found"
            });

        const token = jwt.sign({ id: user._id, role: user.role },
            "ciagrette", { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            message: "Login successful"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }




})
module.exports = router