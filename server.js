/* server.js - Express server for NoteWorthy*/
'use strict';

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Album } = require('./models/album')
const { User } = require('./models/user')
const { Review } = require('./models/review')


app.get('/', (req, res) => {

	res.sendFile('./index.html', {root: __dirname })
})

app.get('/album', (req, res) => {
	res.sendFile('./albums/album_0.html', {root: __dirname })
})

app.post('/', (req, res) => {

	const newUser = new User({
		email: "hannah@test.ie",
	  password: "password",
	  username: "keatingh",
	  bio: "Please work ",
	  friendList: [],
	  favAlbums:  [],
	  userReviews: [],
	  userCollections: [],
	  userToListen: []
	})

	// Save the new resturant
	newUser.save().then((newUser) => {
		res.send(newUser)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})



// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.
