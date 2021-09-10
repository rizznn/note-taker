const fs = require("fs");
const path = require("path");
  
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify( notesArray , null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
}

function deleteNote(query, notesArray) {
  let filteredResults =  notesArray;
  if (query.id) {
    filteredResults = filteredResults.filter(note => note.id !== query.id);
  }
  console.log(filteredResults);
  return filteredResults;
}

module.exports = {
    createNewNote,
    validateNote,
    deleteNote
};
  