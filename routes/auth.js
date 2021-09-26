const express = require('express');
const router = express.Router();

const {register,
    login,
    retID,
    forgotpassword,
    resetpassword
} = require('../controller/auth');

//API AUTH
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
router.route("/retID").get(retID);

module.exports = router;