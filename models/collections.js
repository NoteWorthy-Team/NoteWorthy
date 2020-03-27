/* Collection  Models */

const mongoose = require('mongoose');
const { Album } = require ('./album.js')


const CollectionSchema = new mongoose.Schema({
  collectionName: String,
  description: String,
  albums:[Album.schema]
});


const Collection = mongoose.model('Collection', CollectionSchema);

module.exports =  { Collection } ;
