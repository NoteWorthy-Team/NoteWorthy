/* Review  Models */

const mongoose = require('mongoose');
const { ViewableUser } = require ('./viewableuser.js')
const { savedAlbum } = require ('./savedAlbum.js')

const ReviewSchema = new mongoose.Schema({
    album: savedAlbum.schema,
    user: ViewableUser.schema,
    dateOfReview:Date,
    reviewBody: String,
    rating: Number
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports =  { Review };
