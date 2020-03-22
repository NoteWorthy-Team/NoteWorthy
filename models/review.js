/* Review  Models */

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const ReviewSchema = new mongoose.Schema({
    albumID: ObjectID,
    userID: ObjectID,
    dateOfReview:Date,
    reviewBody: String,
    rating: Number

});

const Review = mongoose.model('Review', ReviewSchema);
module.exports =  { Review };
