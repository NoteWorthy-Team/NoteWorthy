/* Collection  Models */

const mongoose = require('mongoose');
const { savedAlbum } = require ('./savedAlbum.js')


const CollectionSchema = new mongoose.Schema({
  collectionName: String,
  description: String,
  albums:[savedAlbum.schema]
});


const Collection = mongoose.model('Collection', CollectionSchema);

module.exports =  { Collection } ;
