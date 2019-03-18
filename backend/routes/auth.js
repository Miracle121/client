const express = require("express");
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("",(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const auth = new Auth({
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    auth.save()
    .then(result=>{
      res.status(201).json({
        message:'user created',
        result:result
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        });

      });

    });

  });


  //res.send();

});

router.get("",(req,res,next)=>{
  Auth.find().then((result)=>{
    res.status(200).json({
      message:"get is working",
      result
    });
  }).catch(err=>{
    res.status(500).json({
      message:err
    });
  });
});
router.get("/:id",(req,res,next)=>{
  Auth.findById(req.params.id).then(result=>{
    res.status(200).json({
      result
    });
  }).catch(err=>{
    res.status(500).json({
      message:err
    });
  });
});

router.put("/:id",(req,res,next)=>{
  const auth = new Auth({
    _id: req.body.id,
    firstname: req.body.firstname,
    secondname: req.body.secondname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  });
  Auth.updateOne({_id:req.params.id},auth).then((result)=>{
    res.status(200).json({
      message:"Update ..."
    });
  }).catch(err=>{
    res.status(500).json({
      message:err
    })
  });

});

router.delete("/:id",(req,res,next)=>{
  Auth.deleteOne({_id:req.params.id})
  .then((result)=>{
    res.status(200).json({ message: "Deleted" });
  })
  .catch(err=>{
    res.status(500).json({
      err
    });
  });
});
module.exports = router;
