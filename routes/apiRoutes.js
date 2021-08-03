// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

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
function writeNotes() {
  const backendNotes = readNotes();
  const frontendNotes = fs.writeFileSync(path.join(__dirname,'../db/db.json'), JSON.stringify(backendNotes));
  return frontendNotes
}

// ROUTING

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
  // console.log(newNote);
  NotesData.push(newNote);
  // write data to file
  const newNoteData = writeNotes();
  // fs.writeFile('./db/db.json', JSON.stringify(NotesData), (err, newNotes) => {

  // });
  res.json(newNoteData);
});

// Delete Notes
router.delete('/notes/:id', (req, res) => {
  const NotesData = readNotes();
  var newNoteArray = NotesData.filter(element => element.id !== req.params.id);
  console.log(newNoteArray);

  // this this what pushes the updated db.json file to render on the front end
  const newNoteData = writeNotes();
  // fs.writeFile('./db/db.json', JSON.stringify(newNoteArray), (err, updatedNotes) => {

  // });
  res.json(newNoteData);
});


module.exports = router;



// Things left to do:
// 1. Fix the front end to update upon deletion of note.
// 2. Read Me (add delete feature to ReadMe if fixed)
