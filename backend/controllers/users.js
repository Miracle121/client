const User = require('../models/Users');
exports.createUsers = (req, res, next) => {
  const user = new User({
    titel: req.body.titel,
    contet: req.body.contet,
    creater: req.userData.userId
  });
  res.status(200).json({});
  user.save().then(result => {
    res.status(201).json({
      message: "Result Added",
      postId: result.id
    });
  });
}

exports.updateUsers = (req, res, next) => {
  const userupdate = new User({
    _id: req.body.id,
    titel: req.body.titel,
    contet: req.body.contet,
    creater: req.userData.userId
  });
  //console.log(userupdate);
  User.updateOne({ _id: req.params.id, creater: req.userData.userId }, userupdate).then(result => {
   // console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(401).json({
        message: "Unsuccessful Updated"
      });
    }
  });
}

exports.getUsers = (req, res, next) => {
  User.find().then((result) => {
    res.status(200).json({
      message: "data sended success fully",
      post: result
    });
  });
}

exports.getUserById = (req, res, next) => {
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
}

exports.deleteUsers = (req, res, next) => {
  User.deleteOne({ _id: req.params.id, creater: req.userData.userId }).then((result) => {
    if (result.n > 0) {
      console.log(result);
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(401).json({
        message: "Undeleted Updated"
      });
    }

  })
}

//module.exports =router;
