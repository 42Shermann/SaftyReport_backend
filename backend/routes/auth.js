const express = require('express');
const router = express.Router();

const {register,
    login,
    retID,
    updateUser,
    getAllUsers,
    forgotpassword,
    resetpassword
} = require('../controller/auth');

//API AUTH
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
router.route("/retID").get(retID);
router.route("/updateUser").put(updateUser);
router.route("/getAllUsers").get(getAllUsers);

module.exports = router;