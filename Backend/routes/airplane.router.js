const router = require("express").Router();

const AirplaneController = require('../controllers/airplaneController');
const airplaneController = new AirplaneController();

const { authenticateToken } = require('../middlewares/auth');


router.get("/list/Airports", authenticateToken, airplaneController.getAirportsList);
router.post("/save/Details", authenticateToken, airplaneController.saveDetails);


module.exports = router;

