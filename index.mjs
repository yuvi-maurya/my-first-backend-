import express from 'express'
import {prisma} from './prisma/prisma_client.mjs'
const server = express()
const port =5000

server.get("/", (req , res) => {
    res.json({name:"apple"})
})

server.use(express.json())

server.post("/login", (req , res) => {
    console.log(req.body)
    res.status(200).json({name:"success"})
})

server.post("/signup", async (req , res) => {
    console.log(req.body)
    const users = await Promise.users.create({
        data:{
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,

        }
    })

    res.json({name:"signup"})
})




server.listen(5000, () =>{
    console.log(`server started on ${port}`)
})