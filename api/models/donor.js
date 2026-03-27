const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contact: { type: String, required: true },
  age: { type: Number },
  city: { type: String }
});

module.exports = mongoose.model("Donor", donorSchema);