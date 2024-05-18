const express = require('express');
const cors = require('cors');
const app=express()
const port=process.env.PORT ||5000;


const hello=[
    {
        name:"alamin",
        email:"ala756297@gmail.com",
        mobile:"nai"
    }
]

app.get('/',(req,res)=>{
    res.send(hello)
} )

app.listen(port, ()=>{
    console.log(`Example app are listening from ${port}`)
})