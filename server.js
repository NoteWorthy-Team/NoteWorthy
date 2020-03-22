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
	// sending a string
	//res.send('This should be the root route!')

	//sending some HTML
	res.sendFile('./index.html', {root: __dirname })
})


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
	console.log("NoteWorthy running")

})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.

	if(process.env.NODE_ENV === 'production'){
	     //set static folder
	    app.use(express.static('client/build'));
	}
	 app.get('*',(req, res) => {
	     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	 });
