/* Review  Models */

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    albumID: ObjectId,
    userID: ObjectId,
    dateOfReview:Date,
    reviewBody: String,
    rating: Number

});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };
