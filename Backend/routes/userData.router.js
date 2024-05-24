
const { check } = require("express-validator");
const { validateUser, validate } = require("../middlewares/validator");
const router = require("express").Router();

const UserDataController = require('../controllers/userDataController');
const userDataController = new UserDataController();


router.post("/create", validateUser,validate, userDataController.createUser);
router.post("/signIn", userDataController.signIn);
router.post('/forgotPassword', userDataController.forgotPassword);
router.post('/resetPassword', userDataController.resetPassword);


module.exports = router;

