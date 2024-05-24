
const router = require("express").Router();

const { updateConfig } = require('../controllers/schedularController');

router.get("/generateAmadeusAccessToken", updateConfig);


module.exports = router;

