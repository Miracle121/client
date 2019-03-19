const express = require("express");

const User = require('../models/Users');
const checkAuth = require("./../middleware/check-auth");

const router = express.Router();
router.post("", (req, res, next) => {
  const user = new User({
    titel: req.body.titel,
    contet: req.body.contet
  });
  user.save().then(result => {
    res.status(201).json({
      message: "Result Added",
      postId: result.id

    });
  });
});
router.put("/:id", (req, res, next) => {
  const userupdate = new User({
    _id: req.body.id,
    titel: req.body.titel,
    contet: req.body.contet
  });
  User.updateOne({ _id: req.params.id }, userupdate).then(result => {
    res.status(200).json({ message: "Update successful" });
  });
});

router.get("",  (req, res, next) => {
  User.find().then((result) => {
    res.status(200).json({
      message: "data sended success fully",
      post: result
    });
  });
});
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
     if (user) {
      res.status(200).json(
        user
      );
    }
    else {
      res.status(404).json({ message: 'sss000' });
    }

  });

});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("Deleted");
    res.status(200).json({ message: "Deleted" });
  })
  //  console.log(req.params.id);
});
module.exports =router;
