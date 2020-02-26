// JS page for the Bahen album

"use strict";

class album {
  constructor(albumId, albumName,albumCover, artist, producer, year, genre,
    label, length, trackList, avgRating, reviews ) {
    this.albumId = albumId;
    this.albumName = albumName;
    this.albumCover = albumCover;
    this.artist = artist ;
    this.producer = producer;
    this.year = year;
    this.genre = genre;
    this.label =label ;
    this.length = length;
    this.trackList =trackList ;
    this.avgRating = avgRating;
    this.reviews = reviews;
  }
}

class trackInfo {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

class reviewData {
  constructor(dateOfReview, albumName, albumCover, reviewBody, rating,userId, userName, userPic) {
    this.dateOfReview = dateOfReview;
    this.albumName = albumName;
    this.albumCover = albumCover;
    this.reviewBody = reviewBody;
    this.rating = rating;
    this.userId = userId;
    this.userName=  userName;
    this.userPic = userPic
  }
}


let nothworthyReviewTony = new reviewData( new Date(2020, 1, 24), "Bahen… ",'../samples/sample_album_art/bahen....jpg',
"OVERRATED. This album is trash. The instrumentation sucks, the vocals suck, I hate everything about this band and their stupid faces." +
" I wish I had a time machine so that I could go back in time and stop this album from being created. " +
"I’m DISTRAUGHT. ",0,0, "tonybaloney", '../samples/sample_profile_pictures/tonybaloney.jpg');

let nothworthyReviewCsC = new reviewData( new Date(2020, 11, 23), "Bahen… ",'../samples/sample_album_art/bahen....jpg',
"A wonderful debut for truly the best new thing in music. Rarely in today’s music landscape has a band been able to take over as NoteWorthy has." +
" Up and down the track list there is not a track that can be singled out as they are all so good. This album is quintessential listening to anyone" +
" with even a single ear. ",5,1, "csc309 ", '../samples/sample_profile_pictures/csc309.jpg');

const nothworthyTrackList = [];
nothworthyTrackList.push( new trackInfo('Intro (Into Web Programming)', '3:09'))
nothworthyTrackList.push( new trackInfo('Markadelic', '2:36'))
nothworthyTrackList.push( new trackInfo('Remark Request', '2:53'))
nothworthyTrackList.push( new trackInfo('Linear Adjustment  ', '3:11'))
nothworthyTrackList.push( new trackInfo('I Ruined the Repo and I Don\'t Know What to Do', '2:09'))
nothworthyTrackList.push( new trackInfo('The Midterm ', '4:11'))
nothworthyTrackList.push( new trackInfo('PoST', '3:18'))
nothworthyTrackList.push( new trackInfo('TTC Delay ', '1:08'))
nothworthyTrackList.push( new trackInfo('Late Withdrawal  ', '2:47'))
nothworthyTrackList.push( new trackInfo('Bahen ', '4:12'))

const nothworthyReviewList = []
nothworthyReviewList.push(nothworthyReviewTony)
nothworthyReviewList.push(nothworthyReviewCsC)

const BahenAlbum = new album(1, "Bahen...", '../samples/sample_album_art/Bahen....jpg',
  'NoteWorthy', 'NoteWorthy', 2020, 'Rock', 'MarkUs Records', '29:34',
  nothworthyTrackList, 2.5, nothworthyReviewList);

// a list of DOM master elements
const navbar = document.getElementById("navbar");
const albumName = document.getElementById("albumName");
const reviews = document.getElementById("reviews");
const albumCover = document.getElementById("albumCover");
const albumInfo = document.getElementById("albumInfo");
const ratings = document.getElementById("ratings");
const trackList = document.getElementById("trackList");


// Runs certain functions once the page is loaded
window.onload = function() {
  displayAlbumInfo(BahenAlbum)
};

function displayAlbumInfo(album) {
  // adding the album name
  const albumNametext = album.albumName
  const albumNameHeader = document.createElement('H1')
  albumNameHeader.appendChild(document.createTextNode(albumNametext))
  albumName.appendChild(albumNameHeader)

  // displaying the album cover
  const albumCoverSrc = album.albumCover
  const albumCoverImg = document.createElement('img')
  albumCoverImg.className = 'coverPic';
  albumCoverImg.src = albumCoverSrc
  albumCover.appendChild(albumCoverImg)

  // display the album info
  const artistText = "Artist: " + album.artist;
  const producerText = "Producer: " + album.producer;
  const yearText = "Orginal Release: " +album.year;
  const genreText = "Genre: "+ album.genre;
  const labelText = "Label: " +album.label;
  const lengthText = "Length: " + album.length;

  const artistPara = document.createElement('p')
  const producerPara = document.createElement('p')
  const yearPara = document.createElement('p')
  const genrePara= document.createElement('p')
  const labelPara = document.createElement('p')
  const lengthPara = document.createElement('p')

  artistPara.appendChild(document.createTextNode(artistText))
  albumInfo.appendChild(artistPara)

  producerPara.appendChild(document.createTextNode(producerText))
  albumInfo.appendChild(producerPara)

  yearPara.appendChild(document.createTextNode(yearText))
  albumInfo.appendChild(yearPara)

  genrePara.appendChild(document.createTextNode(genreText))
  albumInfo.appendChild(genrePara)

  labelPara.appendChild(document.createTextNode(labelText))
  albumInfo.appendChild(labelPara)

  lengthPara.appendChild(document.createTextNode(lengthText))
  albumInfo.appendChild(lengthPara)

  // display the album average rating
  const albumRatingText = album.avgRating + " Stars"
  const ratingHead = document.createElement('h2')

  ratingHead.appendChild(document.createTextNode(albumRatingText))
  ratings.appendChild(ratingHead)

  // Display the track list
  const albumTractList = album.trackList
  for( let i =0; i< albumTractList.length; i++)
  {
    const currentTrack =  albumTractList[i];
    const currentTrackText = (i+1) + ". " +currentTrack.name;
    const trackNamePara = document.createElement('p')
    trackNamePara.appendChild(document.createTextNode(currentTrackText))
    trackList.appendChild(trackNamePara)
  }

  // Display some resent review
    console.log(album.reviews.length)
  if( album.reviews.length != 0) {
    for(let i = 0; i< 3 && i < album.reviews.length; i++)
    {
      let currentReview = album.reviews[i];


      // Loading the profile picture
      let reviewUserProfile= currentReview.userPic;
      const albumCoverImg = document.createElement('img')
      albumCoverImg.className = 'reviewUserPic';
      albumCoverImg.src = reviewUserProfile;

      // linking back to the profile
      const albumLink = document.createElement('a')
      albumLink.href = '../users/user_' + currentReview.userId +'.html';
      albumLink.appendChild(albumCoverImg)


      // loading in the user name
      let reviewAlbumName = currentReview.userName;
      const reviewAlbumNameHead = document.createElement('h1')
      reviewAlbumNameHead.appendChild(document.createTextNode(reviewAlbumName))

      // loading in the review date
      let reviewDatePreBreak = "Reviewed on: ";

      let reviewDatePostBreak =  currentReview.dateOfReview.getDate() +"/  "
      + currentReview.dateOfReview.getMonth() +"/ "+
      + currentReview.dateOfReview.getFullYear()

      const reviewDateHead = document.createElement('h2')
      reviewDateHead.appendChild(document.createTextNode(reviewDatePreBreak))
      reviewDateHead.appendChild(document.createElement('br'))
      reviewDateHead.appendChild(document.createTextNode(reviewDatePostBreak))

      // loading in the rating
      let reviewRating = "Rating: " + currentReview.rating + "/5"

      const reviewRatingHead = document.createElement('h2')
      reviewRatingHead.appendChild(document.createTextNode(reviewRating))

      // loading the text of the review
      let reviewText = currentReview.reviewBody;

      const textPara= document.createElement('p')
      textPara.appendChild(document.createTextNode(reviewText));


      // adding elements to the review div
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'reviewsDiv';

      reviewDiv.appendChild(albumLink);
      reviewDiv.appendChild(textPara);
      reviewDiv.appendChild(reviewAlbumNameHead);
      reviewDiv.appendChild(reviewDateHead);
      reviewDiv.appendChild(reviewRatingHead);

      reviews.appendChild(reviewDiv);
    }
    // Add a link down here to bring the user to a screen where they can edit their favourite list

  }
  // Shows a message telling user to write some reviews
  else
  {
    const noReviewsPara= document.createElement('p')
    const noReviewDiv = document.createElement('div')

    noReviewDiv.className = 'messageDiv'
    const noReviewMessage = "Currently, there is no reviews for this album"

    noReviewsPara.appendChild(document.createTextNode(noReviewMessage))
    noReviewDiv.appendChild(noReviewsPara)
    reviews.appendChild(noReviewDiv)
  }
}
