const path = require('path');
const router = require('express').Router();

// GET route to serve index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
  
// GET route to serve notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
  
// wildcard route`
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});  

module.exports = router;