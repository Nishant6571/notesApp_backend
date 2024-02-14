const express = require("express");
const { NoteModel } = require("../models/note.model");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();

// post notes
noteRouter.post("/", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note Added" });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

// get all notes
noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.status(200).send({ msg: "AllNotes", notes });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

// patch notes
noteRouter.patch("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID == req.body.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).send({ msg: "Note Updated." });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

// Delete a note
noteRouter.delete("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID === req.body.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).send({ msg: "Note Deleted." });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = { noteRouter };
