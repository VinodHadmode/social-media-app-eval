const express = require("express")
const { PostModel } = require("../Models/Post.model")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    const query=req.query
    console.log(query);
    try {
        const posts = await PostModel.find(query)
        res.status(200).send(posts)

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

//create post

postRouter.post("/create", async (req, res) => {
    // const body=req.body
    // console.log(body);
    const {title,body,device,authorID}=req.body
    try {
        const post = new PostModel({title,body,device,authorID:authorID})
        await post.save()
        res.status(200).send({ msg: "new post has been created" })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRouter.patch("/update/:ID", async (req, res) => {
    // const body=req.body
    // console.log(body);
    const {ID}=req.params
    try {
        const post =await PostModel.findByIdAndUpdate({_id:ID},req.body)
        res.status(200).send({ msg: " post has been updated" })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

postRouter.delete("/delete/:ID", async (req, res) => {
    // const body=req.body
    // console.log(body);
    const {ID}=req.params
    try {
        const post =await PostModel.findByIdAndDelete({_id:ID})
        res.status(200).send({ msg: " post has been deleted" })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

module.exports={
    postRouter
}