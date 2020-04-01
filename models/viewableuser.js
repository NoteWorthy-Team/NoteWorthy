/* Viewable User  Models */

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const ViewableUserSchema = new mongoose.Schema({
  _id:  ObjectID,
  displayName: String,
  profilePic: String
});

const ViewableUser = mongoose.model('ViewableUser', ViewableUserSchema);

module.exports =  { ViewableUser } ;
