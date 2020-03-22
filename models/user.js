/* User  Models */

const mongoose = require('mongoose');
const review = require ('./review.js')
const album = require ('./album.js')
const ReviewSchema = review.Schema
const AlbumSchema = album.Schema

class collectionData {
  constructor( collectionName, description, albums ) {
    this.collectionName = collectionName;
    this.description = description;
    this.albums = albums;
  }
}

const CollectionSchema = new mongoose.Schema({
    collectionName: String,
    description: String,
    albums: [AlbumSchema],
});

const UserSchema = new mongoose.Schema({
    username: String,
    //profilePic:,
    bio: String,
    friendList: [ObjectId],
    favAlbums: [AlbumSchema],
    userReviews: [ReviewSchema],
    userCollections: [CollectionSchema],
    userToListen: [AlbumSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
