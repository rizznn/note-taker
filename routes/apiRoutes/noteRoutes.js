const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { v4: uuidv4 } = require('uuid');

// To add route
router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes)
    })
});

router.post('/notes', (req, res) => {
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err;
        var notes = JSON.parse(data);
        // req.body is where our incoming content will be
        // set id using uuid
        req.body.id = uuidv4();

        // if any data in req.body is incorrect, send 400 error back
        if (!validateNote(req.body)) {
            res.status(400).send('The note is not properly formatted.');
        } else {
            const note = createNewNote(req.body, notes );
            res.json(note);
        }
    })
});  

// to delete
router.delete('/notes/:id', (req, res) => {
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err;
        var notes = JSON.parse(data);

        let result = deleteNote(req.params.id, notes );
        result = result.filter(({ id }) => id !== req.params.id);

        fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(result));
        res.json(result);
    })
});

module.exports  = router;