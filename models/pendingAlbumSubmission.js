/* Pending album submission models */

const mongoose = require('mongoose');
const  { Album }  =  require('./album.js')
const { ObjectID } = require('mongodb')

// should use objectid for user
const SubmissionSchema = new mongoose.Schema({
    title: String,
    artists: [String],
    user: ObjectID,
    time: Date,
    details: Album.schema
});

const PendingAlbumSubmission = mongoose.model('PendingAlbumSubmission', SubmissionSchema);

module.exports = { PendingAlbumSubmission };
