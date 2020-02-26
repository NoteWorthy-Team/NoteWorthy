// JS page for the Help album

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

let helpReviewCsC = new reviewData( new Date(2019, 11, 23), "Help!",'../samples/sample_album_art/help.jpg',
"Help! cannot be talked about without talking about the film of the same name by the Beatles." +
" When spoken about, the album itself is often overshadowed by the film. Don’t get me wrong it’s a great film but "+
"the album deserves more attention from the general public and the Beatles fanbase. " +
" I would even go as far as lumping it with Rubber Soul and Revolver as albums that truly reflected the maturation of the Beatles"
,4,1, "csc309 ", '../samples/sample_profile_pictures/csc309.jpg');

const helpTrackList = [];
helpTrackList.push( new trackInfo('Help!', '2:18'))
helpTrackList.push( new trackInfo('The Night Before ', '2:34'))
helpTrackList.push( new trackInfo('You\'ve Got to Hide Your Love Away', '2:09'))
helpTrackList.push( new trackInfo('I Need You ', '2:28'))
helpTrackList.push( new trackInfo('Another Girl ', '2:05'))
helpTrackList.push( new trackInfo('You\'re Going to Lose That Girl', '2:18'))
helpTrackList.push( new trackInfo('Ticket to Ride ', '3:09'))
helpTrackList.push( new trackInfo('Act Naturally ', '2:30'))
helpTrackList.push( new trackInfo(' It\'s Only Love', '1:56'))
helpTrackList.push( new trackInfo('You Like Me Too Much ', '2:36'))
helpTrackList.push( new trackInfo('Tell Me What You See ', '2:37'))
helpTrackList.push( new trackInfo('I\'ve Just Seen a Face ', '2:05'))
helpTrackList.push( new trackInfo('Yesterday  ', '2:05'))

const helpReviewList = []
helpReviewList.push(helpReviewCsC)

const BahenAlbum = new album(2, "Hep!", '../samples/sample_album_art/help.jpg',
  'The Beatles', 'George Martin', 1965, 'Rock', 'Parlophone', '33:44',
  helpTrackList, 4, helpReviewList);

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
