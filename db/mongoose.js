'use strict';

const mongoose = require('mongoose');

// Will need to update to correct URL for the server.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NoteWorthyAPI',{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

module.exports = { mongoose }
