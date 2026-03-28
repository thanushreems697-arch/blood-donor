const pool = require("../db");

const getDonors = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM donors ORDER BY id DESC");
    // Map 'id' to '_id' for frontend compatibility
    const donors = rows.map(r => ({ ...r, _id: r.id.toString() }));
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
};

const addDonor = async (req, res) => {
  const { name, bloodGroup, contact, age, city } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO donors (name, bloodGroup, contact, age, city) VALUES (?, ?, ?, ?, ?)",
      [name, bloodGroup, contact, age, city]
    );
    res.status(201).json({ id: result.insertId, _id: result.insertId.toString(), ...req.body });
  } catch (error) {
    res.status(400).json({ message: "Error adding donor", error: error.message });
  }
};

const deleteDonor = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM donors WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error: error.message });
  }
};

module.exports = { getDonors, addDonor, deleteDonor };