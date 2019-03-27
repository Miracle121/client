const express = require("express");
const autController = require("../controllers/auth");
//const cheakuser = require("./../middleware/check-auth");
const router = express.Router();
router.post("", autController.autSignUp);
router.get("", autController.autGetSignUpUser);
router.get("/:id", autController.autGetBySignUpUser);
router.put("/:id", autController.authUserUpdate);
router.delete("/:id", autController.authDeleteUser);
router.post("/login", autController.authLoginUser);

module.exports = router;

