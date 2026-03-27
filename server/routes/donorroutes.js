const express = require("express");
const { getDonors, addDonor, deleteDonor } = require("../controllers/donorController");
const router = express.Router();

router.get("/", getDonors);
router.post("/", addDonor);
router.delete("/:id", deleteDonor);

module.exports = router;