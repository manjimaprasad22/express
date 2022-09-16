const express = require('express')
const router = express.Router()
const {userData}=require('./../../config/connection')
const bcrypt = require('bcrypt')

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})




router.post('/register',async(req,res)=>{

    let hpswd =await bcrypt.hash(req.body.pswd,10)
    let userdata = new userData({
        Name:req.body.name,
        Uname:req.body.uname,
        Mobile:req.body.mobile,
        Pswd:hpswd
    })
    userdata.save((err)=>{
        if(err) throw err
        else
        res.redirect('/user/login')
    })

})



router.post('/validate',async(req,res)=>{   //http://localhost:8000/user/validate
    let usname=req.body.uname
    let pass= req.body.pswd
    //let data=await-userData.findOne({Uname:usname})
    userData.findOne({Uname:usname}).then((data)=>{
        console.log(data);
        if(data==null){
            console.log("username not found");
        }else{
            bcrypt.compare(pass,data.Pswd,(err,user)=>{
                if(err) throw err
                else{
                    console.log(user);
                    if(user){
                        req.session.isUser =true
                        res.redirect('/books')
                    }
                    else{
                        console.log("password not match");
                    }
                }
            })
        }
    })
})
router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/user/login')
})

module.exports= router