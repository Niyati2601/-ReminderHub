const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/List");

router.post("/addReminder", async (req, res) => {
  try {
    const { title, body, date, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, date, user: existingUser, notified: false });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      res.status(200).json({ list });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reminder" });
  }
});

router.patch("/editReminder/:id", async (req, res) => {
  try {
    const { title, body, date } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body, date }, { new: true });
    if (list) {
      res.status(200).json({ message: "Task Updated", data: list });
    } else {
      res.status(404).json({ message: "Reminder not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating reminder" });
  }
});

router.delete("/deleteReminder/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting reminder" });
  }
});

router.get("/getReminders/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    if (list.length > 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No Reminders found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reminders" });
  }
});

module.exports = router;
