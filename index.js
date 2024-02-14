const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home page" });
});

// connecting app to the server
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Database Connected");
    console.log(`Server is running at http://localhost:${process.env.port}`);
  } catch (err) {
    console.log("Error:", err);
  }
});
