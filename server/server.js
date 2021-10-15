require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`express server is running on port: ${port}`);
});
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

//Mongoose
mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0.jzlmx.mongodb.net/${dbName}?retryWrites=true&w=majority`
);

// Data schema and model
const noteSchema = {
  title: String,
  noteText: String,
};

const Note = mongoose.model("Note", noteSchema);

//API routes
app.get("/notes", (req, res) => {
  Note.find().then((notes) => res.send(notes));
});
app.post("/newnote", (req, res) => {
  const title = req.body.title;
  const noteText = req.body.noteText;
  const newNote = new Note({
    title,
    noteText,
  });
  newNote.save();
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete({ _id: id }, (err) => {
    if (!err) {
      console.log("Note deleted");
    } else {
      console.log(err);
    }
  });
});
