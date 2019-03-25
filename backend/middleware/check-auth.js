const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
  try {
    const token = req.headers.authorization.split(" ")[1];

    var decodtoken = jwt.verify(token, ('miracle121').toString());
    //console.log(decodtoken);
    //const decodtoken =
    //jwt.verify(token,"miracle121");
    //console.log(decotodken);
    req.userData = { email: decodtoken.email, userId: decodtoken.userId};
    next();
  } catch (error) {
    res.status(401).json({
      message:"Auth filed"+error
    });
  }

};
