'use strict';

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NoteWorthyAPI'

// Will need to update to correct URL for the server.
mongoose.connect(mongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

	

module.exports = { mongoose }  // Export the active connection.
