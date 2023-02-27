var express = require("express");
var router = express.Router();

// Import the counter controller
const counterController = require("../controllers/counter.js");

// increment counter route
router.post("/increment", (req, res) => {
  counterController.increment(req, res);
});

// decrement counter route
router.post("/decrement", (req, res) => {
  counterController.decrement(req, res);
});

router.post("/reset", (req, res) => {
  counterController.reset(req, res);
});

// Create a new counter route
router.post("/create", (req, res) => {
  counterController.create(req, res);
});

// delete counter route
router.post("/delete", (req, res) => {
  counterController.deleteCounter(req, res);
});

// Get all counters route
router.get("/all", (req, res) => {
  counterController.getAll(req, res);
});

// Increment alternative route
router.post("/incrementAlternative", (req, res) => {
  counterController.incrementAlternate(req, res);
});

// Decrement alternative route
router.post("/decrementAlternative", (req, res) => {
  counterController.decrementAlternate(req, res);
});

module.exports = router;
