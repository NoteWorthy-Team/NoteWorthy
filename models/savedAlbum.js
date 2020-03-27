/* user saved album  Models */

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const SavedAlbumSchema= new mongoose.Schema({
  _id: ObjectID,
  name: String,
  cover: String
});

const savedAlbum = mongoose.model('savedAlbum', SavedAlbumSchema);

module.exports =  { savedAlbum } ;
