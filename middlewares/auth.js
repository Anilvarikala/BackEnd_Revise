
const jwt = require('jsonwebtoken')
exports.validateUser = async (req, res, next) => {
    const {token} = req.headers;
     console.log(token)

    const userId = req.session.user._id;
    
    const decodedId = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedId)
    if(decodedId.id === userId){
      next()
    }
    else{
    return res.json({
      message :"UnAuthorized",

    })
  }
    // console.log(decoded, "html")
    
}