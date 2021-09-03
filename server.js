// The require() statements will read the index.js files in each of the directories indicated.
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db');

const PORT = process.env.PORT || 3001;
// to instantiate the server
const app = express();

// to make certain files readily available - all assets
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
  