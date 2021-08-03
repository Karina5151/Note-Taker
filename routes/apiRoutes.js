// LOAD DATA
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require('uuid');


// Re-read data each time
function readNotes() {
  const backendNotes = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  return JSON.parse(backendNotes)
}

// Re-write data each time
function writeNotes(notesArray) {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray));
}

// ROUTING---------------------------------------------

// API GET Requests
router.get('/notes', (req, res) => {
  const backendNotes = readNotes();
  res.json(backendNotes);
});

// API POST Requests
router.post('/notes', (req, res) => {
  console.log(req.body);
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv1(),
  };
  const NotesData = readNotes();
  NotesData.push(newNote);
  
  // write data to file
  writeNotes(NotesData);
  // Write New Note to Front End
  res.json(NotesData);

});

// DELETE NOTES
router.delete('/notes/:id', (req, res) => {
  const NotesData = readNotes();
  var newNoteArray = NotesData.filter(element => element.id !== req.params.id);
  console.log(newNoteArray);

  // write data to file
  writeNotes(newNoteArray);
  // Write New Array to Front End
  res.json(newNoteArray);
});


module.exports = router;



// Things left to do:
// 1. Fix the front end to update upon deletion of note.
// 2. Read Me (add delete feature to ReadMe if fixed)
