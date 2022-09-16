const express = require('express')
require('dotenv').config()
const app = new express()
const {bookData, authorData,userData,sessionstore}= require('./config/connection')
const bookroute = require('./src/routers/BookRouter')
const authorroute = require('./src/routers/authorRouter')
const userRouter = require('./src/routers/userRouter')
const session = require('express-session')

app.set('view engine','ejs')
app.use(express.static('./public'))
app.set('views','./src/views')
app.use(express.urlencoded({extended:true}))   //used to get data from http body
app.use(express.json())   
app.use(session({
    secret:process.env.USER_SESSION,
    resave:false,
    saveUninitialized:false,
    store:sessionstore
    
}))
// used to render json

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html')
//     let arr = [1,2,3,4,5]
//     res.render('index',{arr})
// })


// to get the page while clicking nav
app.use('/books',bookroute)
app.use('/authors',authorroute)
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.render('index')
})

//to pass value


// app.get('/login',(req,res)=>{
//    res.send('Login')
// })

// app.get('/login/data',(req,res)=>{
    
// })

// app.get('/login/:user',(req,res)=>{
//     let user = req.params.user
//     res.json({"username":user})
// })




// app.get('/login/:user',(req,res)=>{
//     let user = req.params.user
//     res.send(`Welcome ${user}`)
// })

app.listen(8000,()=>{
    console.log('server listening at 8000');
})