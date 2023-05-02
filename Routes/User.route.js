const express = require("express")
const { UserModel } = require("../Models/User.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, password, gender } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (hash) {
                const user = new UserModel({ name, email, password: hash, gender })
                await user.save()
                res.status(200).send({ msg: "new user registered" })
            }
            if (err) {
                res.status(400).send({ msg: err.message })
            }
        });

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    try {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                // result == true
                if (result) {
                    var token = jwt.sign({ authorId:user._id,authorName:user.name }, 'masai');
                    res.status(200).send({ msg: "Login successfull!!", token: token })
                }
                if (err) {
                    res.status(400).send({ msg: err.message })
                }
            });
        }

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})


module.exports = {
    userRouter
}
