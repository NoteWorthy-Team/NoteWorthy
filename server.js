/* server.js - Express server for NoteWorthy*/
'use strict';

const express = require('express')

const app = express();


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
	console.log("NoteWorthy running")
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.
