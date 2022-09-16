const isLoggedIn=(req,res,next)=>{
    if(req.session.isUser)
    {
        next()
    }
    else{
        res.redirect('/user/login')
    }
}

module.exports= isLoggedIn