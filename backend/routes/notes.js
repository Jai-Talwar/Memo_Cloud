let express = require("express");
const route = express.Router();
const mynotes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
let fetchuser = require("../middleware/fetchuser");
// Route 1 :fetch all notes
route.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const data = await mynotes.find({ user: req.userId });
    res.send(data);
  } catch (error) {
    res.send({ error });
  }
});
route.use(express.json());
route.post(
  "/createnote",
  fetchuser,
  [
    body("title", "title can't be empty").isLength({ min: 1 }),
    body("description", "descriptionc can't be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.send({
          status: 400,
          error: result.array(),
        });
      }
      const note = await mynotes.create({
        user: req.userId,
        title,
        description,
        tag,
      });
      res.json(note);
    } catch (error) {
      res.status(400).send("internal server error");
    }
  }
);
// route.put("/updatenote/:id", fetchuser, async (req, res) => {
//   try {
//     const { title, description, tag } = req.body;
//     let note = await mynotes.findById(req.params.id);
//     if (!note) {
//       return res.send(400).send("no such note present");
//     }
//     if (req.userId != note.user) {
//       return res.status(401).send("authentication failure");
//     }
//     const newnote = {};
//     if (title) newnote.title = title;
//     if (description) newnote.description = description;
//     if (tag) newnote.tag = tag;

//     await mynotes.findByIdAndUpdate(
//       req.params.id,
//       { $set: newnote },
//       { new: true }
//     );
//     res.send(newnote);
//   } catch (error) {
//     res.status(400).send("internal server error");
//   }
// });
route.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let note = await mynotes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("No such note present");
    }
    if (req.userId != note.user) {
      return res.status(401).send("Authentication failure");
    }
    const newnote = {};
    if (title) newnote.title = title;
    if (description) newnote.description = description;
    if (tag) newnote.tag = tag;

    const updatedNote = await mynotes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
route.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // const { title, description, tag } = req.body;
    let note = await mynotes.findById(req.params.id);
    if (!note) {
      return res.send(400).send("no such note present");
    }
    if (req.userId != note.user) {
      return res.status(401).send("authentication failure");
    }
    await mynotes.deleteOne({ _id: req.params.id });
    // const newnote = {};
    // if (title) newnote.title = title;
    // if (description) newnote.description = description;
    // if (tag) newnote.tag = tag;

    // await mynotes.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: newnote },
    //   { new: true }
    // );
    res.send("done bro");
  } catch (error) {
    res.status(400).send("internal server error");
  }
});
module.exports = route;
