const mongoose = require("mongoose");

const mongoDb = (req, res) => {
  try {
    mongoose
      .connect(
        "mongodb+srv://niyati_shah:niyati@cluster1.iongmtq.mongodb.net/reminder",
        { useNewUrlParser: true }
      )
      .then(() => console.log("Connect"));
  } catch (error) {
    res.status(400).json({ message: "Error in Connecting to MongoDb" });
  }
};
mongoDb();
