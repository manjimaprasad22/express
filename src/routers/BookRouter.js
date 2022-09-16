const express = require('express')
const router = express.Router()
const {bookData,authorData}=require('./../../config/connection')
const isLoggedIn = require('../../config/auth')


router.get('/',isLoggedIn,(req,res)=>{   //http://localhost:8000/books/
    bookData.find().then((data)=>{

        res.render('books',{data})
    })
})


router.get('/addbook',isLoggedIn,(req,res)=>{ //http://localhost:8000/books/addbook
    authorData.find().then((auth)=>{
        
        res.render('addbook',{auth})
    })
})

router.get('/singlebook/:id',(req,res)=>{
    let id=req.params.id
    bookData.findById(id).then((data)=>{
        res.render("singlebook",{data})
    })

})

router.get('/deletebook/:id',(req,res)=>{
    let id = req.params.id
    bookData.findByIdAndDelete(id).then(()=>{
        res.redirect('/books')
    })
})

router.get('/updatebook/:id',(req,res)=>{
    let id = req.params.id
    bookData.findById(id).then((data)=>{
        authorData.find().then((auth)=>{
        res.render('updatebook',{data,auth})
    })

    })
})
router.post('/updatebook/:id',(req,res)=>{
    let id = req.params.id
    let bookdetails ={
        bookName:req.body.book,
        authorName:req.body.author,
        Price:req.body.price 
    }
    bookData.findByIdAndUpdate(id,{$set:bookdetails}).then((data)=>{

        res.redirect("/books")
    })
})

router.post('/addbook',(req,res)=>{
    let bookdata = new bookData({
        bookName:req.body.book,
        authorName:req.body.author,
        Price:req.body.price
    })    
    // let data = new bookData(bookdata)
    bookdata.save((err)=>{
        if(err) throw err
        else{
            res.redirect('/books')
        }
    })
    console.log(bookdata);
})



module.exports=router