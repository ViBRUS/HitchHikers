
const router = require("express").Router();

const { updateConfig } = require('../controllers/schedularController');
const { authenticateToken } = require('../middlewares/auth');


router.get("/generateAmadeusAccessToken", authenticateToken, updateConfig);


module.exports = router;

