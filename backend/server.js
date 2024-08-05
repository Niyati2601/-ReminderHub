const express = require("express");
require("./Connection/mongoDb");
const authRoutes = require("./routes/auth");
const list = require("./routes/list");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", authRoutes);
app.use("/api/v2", list);

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
