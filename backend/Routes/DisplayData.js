const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.catData]);
  } catch (error) {
    res.send("Server Error");
  }
});

module.exports = router;
