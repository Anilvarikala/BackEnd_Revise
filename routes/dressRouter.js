
const express = require('express')
const auth = require('../middlewares/auth')
const dressRouter = express.Router()
const dressController = require('../controllers/dressController')

dressRouter.get("/", auth.validateUser, dressController.getHome)
dressRouter.post("/add", dressController.postDressAdd)



module.exports = dressRouter;