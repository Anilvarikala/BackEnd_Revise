
const Dress = require('../models/dreesSchema')

exports.getHome = (req, res) => {
  res.send("All dresses")
}

exports.postDressAdd = async (req, res) => {
  const {name, price, color} = req.body;
  const newDress = new Dress({
    name, price, color
  })
  const dress = await newDress.save();
  if(dress){
       res.json({
        success : true,
        message : "Dress Addedd",
        dress : dress,
  })
  }
  else{
       res.json({
    success : false,
    message : "Dress not Addedd"
  })
  }
 
}