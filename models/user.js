/* User  Models */

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { ObjectID } = require('mongodb')
const { review } = require ('./review.js')
const { Album } = require ('./album.js')

const CollectionSchema = new mongoose.Schema({
  collectionName: String,
  description: String,
  albums:[Album.schema]
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,   // custom validator
      message: 'Not valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: String,
  //profilePic:,
  bio: String,
  friendList: [ObjectID],
  favAlbums: [Album.schema],
  userReviews: [Album.schema],
  userCollections: [CollectionSchema],
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
// Taken from Lecture slides
UserSchema.statics.findByEmailPassword = function(email, password) {
  const User = this // binds this to the User model

  // First find the user by their email
  return User.findOne({ email: email }).then((user) => {
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
