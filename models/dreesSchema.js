
const mongoose = require('mongoose')

const dreesSchema = new mongoose.Schema({
     name : {
       type : String, required : true
     },
     price : {
      type : Number, required : true,
     },
     color : {
      type : String, required : false,
     }
})

module.exports = mongoose.models.Drees || mongoose.model('Drees', dreesSchema)