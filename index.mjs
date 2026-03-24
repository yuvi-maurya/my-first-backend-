import express from 'express'
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




server.listen(5000, () =>{
    console.log(`server started on ${port}`)
})