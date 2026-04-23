import "dotenv/config";
import express from 'express'
import {prisma} from './prisma/prisma_client.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { email } from 'zod'
const server = express()
const port =5000


server.use(express.json())

server.get("/", (req , res) => {
    res.json({name:"apple"})
})



server.post("/signup", async (req , res) => {
    console.log(req.body)
    const hashePassword = await bcrypt.hash(req.body.password, 10)
    const user = await prisma.user.create({
        data:{
            password: hashePassword,
            email: req.body.email,
            name: req.body.name,

        }
    })

    res.json(user)
    
})

server.post("/login", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).json({
      error: "user not found",
    });
    return;
  }
  if (!await bcrypt.compare(req.body.password, user.password)) {
    res.status(401).json({
      error: "password not matched",
    });
    return;
  }

  // Toodo: generate token
  const token = jwt.sign({id: user.id, name:user.name, email: user.email},
     process.env.TOKEN_SECRET
    );
  res.json({ message: `login successful, welcome ${user.name}` ,token: token});
});


server.listen(5000, () =>{
    console.log(`server started on ${port}`)
})