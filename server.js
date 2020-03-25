/* server.js - Express server for NoteWorthy*/
'use strict';

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Album } = require('./models/album')
const { User } = require('./models/user')
const { Review } = require('./models/review')

app.use(express.static(__dirname + '/public'));

/*** Session handling **************************************/
// Create a session cookie
// Taken from lecture slides
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// // Our own express middleware to check for
// // an active user on the session cookie (indicating a logged in user.)
// const sessionChecker = (req, res, next) => {
//     if (req.session.user) {
//         res.redirect('/dashboard'); // redirect to dashboard if logged in.
//     } else {
//         next(); // next() moves on to the route.
//     }
// };


/// DIRECT TO WEB PAGES
app.get('/',(req, res) => {
		res.redirect('/index')
})

app.get('/index',(req, res) => {
		//res.render('index.hbs');
	res.sendFile('./public/index.html', {root: __dirname })
})

app.get('/newuser', (req, res) => {
	res.sendFile('/public/newuser.html', {root: __dirname })
})

app.get('/dashboard', (req, res) => {
	res.sendFile('./public/user_0.html', {root: __dirname })
})

app.get('/album', (req, res) => {
	res.sendFile('./public/album_0.html', {root: __dirname })
})

//GET DATBASE INFO

// A POST requests that adds a new user to the database
// the loginName is generated by the app
// This is calculated based on the num of users currently in the server
// Email, Password, displayname, bio are submitted by the user
app.post('/users', (req, res) => {
  	// const newUser = new User(
		const newUser = new User({
		 loginName: req.body.loginName,
		  password:  req.body.password,
			displayName: req.body.displayName,
			bio: req.body.bio,
			friendList: [],
			favAlbums: [],
			userReviews: [],
			userCollections: [],
			userToListen: []
		})
    	// // // Save the new user
    	newUser.save().then((newUser) => {
				res.send(newUser)
    	}, (error) => {
				console.log(error)
				res.send({"error": error})
    	})
})

// A GET requests that returns the users within the datebase
app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.send({ users }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})


// A route to login and create a session
app.post('/users/login', (req, res) => {
	const username = req.body.username
  const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	User.findByUserPassword(username, password).then((user) => {
	    if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;

            res.redirect('/dashboard');
        }
    }).catch((error) => {
		res.status(400).redirect('/login');
    })
})

// A GET request to find a user by ID
app.get('/user/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(401).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	User.find().then((user) => {
		if (!user) {
			res.status(404).send()  // could not find this student
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({student})
			res.send(user)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.
