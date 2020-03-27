/* User  Models */

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { ObjectID } = require('mongodb')
const { review } = require ('./review.js')
const { Album } = require ('./album.js')
const { Collection } = require ('./collections.js')
const { ViewableUser } = require ('./viewableuser.js')


const UserSchema = new mongoose.Schema({
  loginName: String,
  password: String,
  displayName: String,
  bio: String,
  profilePic: String,
  friendList: [ViewableUser.schema],
  favAlbums: [Album.schema],
  userReviews: [Album.schema],
  userCollections: [Collection.schema],
  userToListen: [Album.schema]
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
// Taken from Lecture slides
UserSchema.pre('save', function(next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified('password')) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})


// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
// Adapted from the course codes
UserSchema.statics.findByUserPassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ loginName: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema);

module.exports =  { User } ;
