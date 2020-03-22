/* album  Models */

const mongoose = require('mongoose');
const review = require ('./review.js')
const ReviewSchema = review.Schema

const TrackSchema = new mongoose.Schema({
    name: String,
    length: String

});

const AlbumSchema = new mongoose.Schema({
    name: String,
    //albumCover: ,
    artist: String,
    producer: String,
    year: String,
    genre: String,
    label: String,
    length: String,
    trackList: [TrackSchema],
    avgRating:Number,
    Reviews: [ReviewSchema],

});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = { Album };
