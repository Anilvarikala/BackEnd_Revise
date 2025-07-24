require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const dressRouter = require('./routes/dressRouter');
const userRouter = require('./routes/userRouter');
const app = express();

const session = require('express-session')
const mongoStore = require('connect-mongo')




// Routes
app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(session({
  secret : "Anil",
  saveUninitialized : false,
  resave : false,
  store : mongoStore.create({mongoUrl : process.env.mongoUrl}),
  cookie : {
    maxAge : 24 * 60 * 60 * 1000
  }
}))

app.use("/api/dress",dressRouter)
app.use("/api/user",userRouter)
//app.use(cors())//

const PORT = 3000;


mongoose.connect(process.env.mongoUrl)
.then(() => {
  app.listen(PORT, () => {
   console.log('MongoDb Connected!')
   console.log(`Sever is running at http://localhost:${PORT}`)
   })
}).catch(err => console.log(err))
