const session = require('express-session')
const mongoose = require('mongoose')
const mongosession = require('connect-mongodb-session')(session)
//const url = 'mongodb://localhost:27017/LibraryApp'

const url = process.env.MONGO_DB_URL
const sessionstore = new mongosession({
    uri:process.env.MONGO_DB_URL,
    collection:'mysession'
})

mongoose.connect(url)

const bookSchema = new mongoose.Schema({
    bookName:String,
    authorName:String,
    Price:Number
})
const authorSchema = new mongoose.Schema({
    authorName:String,
    Nation:String,
    Typ:String
})

const userSchema = new mongoose.Schema({
    Name:String,
    Uname:String,
    Mobile:Number,
    Pswd:String
})

const bookData = mongoose.model('books',bookSchema)
const authorData = mongoose.model('authors',authorSchema)
const userData = mongoose.model('users',userSchema)
module.exports = {bookData, authorData,userData,sessionstore}