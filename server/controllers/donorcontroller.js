const Donor = require("../models/Donor");

const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
};

const addDonor = async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(400).json({ message: "Error adding donor", error: error.message });
  }
};
const deleteDonor = async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error: error.message });
  }
};

module.exports = { getDonors, addDonor, deleteDonor };