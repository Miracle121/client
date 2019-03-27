const express = require("express");
const User = require('../models/Users');
const checkAuth = require("./../middleware/check-auth");
const usersControllers = require("../controllers/users");
const router = express.Router();

router.post("", checkAuth, usersControllers.createUsers);
router.put("/:id", checkAuth,usersControllers.updateUsers);
router.get("", usersControllers.getUsers);
router.get("/:id",usersControllers.getUserById);
router.delete("/:id", checkAuth,usersControllers.deleteUsers);
module.exports =router;
