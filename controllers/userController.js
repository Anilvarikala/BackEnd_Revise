
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

function createToken(id){
   return jwt.sign({id},process.env.JWT_SECRET_KEY)
}


exports.postSignup = async (req, res) => {
   const {name, email, password} = req.body;

   let exist = await User.find({email : email})
   console.log(exist)
   if(exist.length != 0){
    return res.json({
      message : "Email exist"
    })
   }

   const hashedPassword = await bcrypt.hash(password, 10)
   
   if(!validator.isEmail(email)){
    return res.json({
      message : "Invalid Email"
    })
   }


   const newUser = new User({
    name, email, password : hashedPassword
   })

   const person = await newUser.save();
   const token = createToken(person._id)
   req.session.user = person;
   if(person){
    return res.json({
      message : "User created",
      token : token,
    })
   } 
   res.json({
    message : "user Not created"
   })

}


exports.postLogin = async (req, res) => {
   const {email , password} = req.body;
   
   // email check
   const exist = await User.find({email : email})
   console.log(exist)
   if(exist.length == 0){
      return res.json({
        message : "Email not there need to signup"
      })
   }

   const match = await bcrypt.compare(password, exist[0].password)

   if(!match){
    return res.json({
      message : "Password not matched",
    })
   }

   const token = createToken(exist._id)
   req.session.user = exist[0];
   // match.
   return res.json({
      message : "Logged in succeessfully",
      token : token
   })

}


exports.getProfile = async (req, res) => {
    res.render('profile', {
       data : req.session.user
    })
}


