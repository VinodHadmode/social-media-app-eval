const express = require("express")
const connection = require("./db")
const { userRouter } = require("./Routes/User.route")
const { postRouter } = require("./Routes/Post.route")
const { auth } = require("./Middleware/auth.middleware")

const app = express()

app.use(express.json())
app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB!!");
    } catch (error) {
        console.log("Something went wrong!!");
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})