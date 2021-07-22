// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
const NotesData = require('../db/db');
const router = require('express').Router();
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');


// ROUTING

// API GET Requests
router.get('/notes', (req, res) => res.json(NotesData));

// API POST Requests
router.post('/notes', (req, res) => {
  console.log(req.body);
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv1(),
  };
  // console.log(newNote);
  NotesData.push(newNote);
  // write data to file
  fs.writeFile('./db/db.json', JSON.stringify(NotesData), (err, newNotes) => {

  });
  
  res.json(newNote);
});

// Delete Notes
router.delete('/notes/:id', (req, res) => {
  var newNoteArray = NotesData.filter(element => {
    if (element.id !== req.params.id) {
      return element;
    } else {
      console.log(element);
    }

  });
  console.log(newNoteArray);
  // this this what pushes the updated db.json file to render back out in the browser
  fs.writeFile('./db/db.json', JSON.stringify(newNoteArray), (err, updatedNotes) => {

  });
  res.json(newNoteArray);
});


module.exports = router;



