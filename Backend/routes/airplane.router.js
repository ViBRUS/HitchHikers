const router = require("express").Router();

const AirplaneController = require('../controllers/airplaneController');
const airplaneController = new AirplaneController();


router.get("/list/Airports", airplaneController.getAirportsList);
router.post("/save/Details", airplaneController.saveDetails);


module.exports = router;

