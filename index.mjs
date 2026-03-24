import express from 'express'
const server = express()
const port =5000

server.get("/", (req , res) => {
    res.json({name:"apple"})
})




server.listen(3000, () =>{
    console.log(`server started on ${port}`)
})