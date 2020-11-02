const router = require("express").Router();
const userControllers = require("../controllers/user");
const passport = require("passport");

const auth = passport.authenticate("jwt", {session: false});

router.post("/register",userControllers.register);
router.post("/login",userControllers.login);
router.put("/changePassword", auth, userControllers.changePassword);


module.exports = router