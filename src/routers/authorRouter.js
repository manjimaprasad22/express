const express = require('express')
const router = express.Router()
const {authorData}=require('./../../config/connection')
const isLoggedIn = require('../../config/auth')

router.get('/',isLoggedIn,(req,res)=>{
    authorData.find().then((auth)=>{
        res.render('authors',{auth})
    })
})
router.get('/addauthor',isLoggedIn,(req,res)=>{
    authorData.find().then((auth)=>{
        res.render('addauthor',{auth})
    })
})

router.get('/singleauthor/:id',(req,res)=>{
    let id = req.params.id
    authorData.findById(id).then((data)=>{
        res.render('singleauthor',{data})
       // console.log(data);
    })
})

router.get('/deleteauthor/:id',(req,res)=>{
    let id = req.params.id
    authorData.findByIdAndDelete(id).then(()=>{
        res.redirect('/authors')
    })
})

router.post('/addauthor',(req,res)=>{
    let authordata = new authorData({
        authorName:req.body.author,
        Nation:req.body.nation,
        Typ:req.body.typ
    })

    authordata.save((err)=>{
        if(err) throw err
        else{
            res.redirect('/authors')
        }
    })
    console.log(authordata);
})

module.exports= router