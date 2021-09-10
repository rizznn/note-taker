const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

// To add route
router.get('/notes', (req, res) => {
    let results = notes ;
    console.log(req.query)
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, { notes });
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes );
        res.json(note);
    }
});  

// to delete
router.delete('/notes/:id', (req, res) => {
    let result = deleteNote(req.params.id, notes );
    result = result.filter(({ id }) => id !== req.params.id);
    // fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(result));
    res.json(result);

});

module.exports  = router;