// JS page for the Hammer album

"use strict";

// The below classes represents the data objects that will be used in this
// file

class user {
  constructor(userid,username,profilePic,bio, friendList,
    favAlbums, userReviews, userCollections, userListList) {
      this.userid = userid;
      this.username = username;
      this.profilePic = profilePic;
      this.bio = bio;
      this.friendList = friendList;
      this.favAlbums = favAlbums;
      this.userReviews = userReviews;
      this.userCollections = userCollections;
      this.userListList = userListList;
    }
  }

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
  constructor(albumId, userid,dateOfReview,reviewBody, rating) {
    this.dateOfReview = dateOfReview;
    this.albumId = albumId;
    this.userid = userid;
    this.reviewBody = reviewBody;
    this.rating = rating;
  }
}

// hardcode Data
// Below is the datacode data that we will be using for  phase 1 of the project

let tonybaloney = new user(0,"tonybaloney",'../samples/sample_profile_pictures/tonybaloney.jpg',
"You don’t like the things that you like, these are the things you like. Staten, NYC.",
[], [0], [], [], []);

const hammerReview = new reviewData( 0, 0, new Date(2019, 1, 14),
"An absolute banger! People are dumb in thinking that this album should only be known for “U Can’t Touch This”." +
" MC Hammer is a true artiste and should be as famous as that garbage band NoteWorthy!", 5);

const hammerTrackList = [];
hammerTrackList.push( new trackInfo('Here Comes the Hammer ', '4:32'))
hammerTrackList.push( new trackInfo('U Can\'t Touch This', '4:17'))
hammerTrackList.push( new trackInfo('Have You Seen Her ', '4:42'))
hammerTrackList.push( new trackInfo('Yo!! Sweetness ', '4:36'))
hammerTrackList.push( new trackInfo('Help the Children ', '5:17'))
hammerTrackList.push( new trackInfo('On Your Face ', '4:32'))
hammerTrackList.push( new trackInfo('Dancin\' Machine ', '2:55'))
hammerTrackList.push( new trackInfo('Pray', '5:13'))
hammerTrackList.push( new trackInfo('Crime Story ', '5:09'))
hammerTrackList.push( new trackInfo('She\'s Soft and Wet ', '3:25'))
hammerTrackList.push( new trackInfo('Black is Black ', '4:32'))
hammerTrackList.push( new trackInfo('Let\'s Go Deeper ', '5:16'))
hammerTrackList.push( new trackInfo(' Work This ', '5:03'))

const hammerReviewList = []
hammerReviewList.push(hammerReview)

const McHammerAlbum = new album(0, " Please Hammer Don’t Hurt ‘Em ", '../samples/sample_album_art/please_hammer_dont_hurt_em.jpg',
  'MC Hammer', 'Big Louis Burrell, MC Hammer, Scott Folks', 1990, 'Hip hop', 'Capitol Records', '59:04',
  hammerTrackList, getAverageRating(hammerReviewList), hammerReviewList);

// a list of DOM master elements
const navbar = document.getElementById("navbar");
const albumName = document.getElementById("albumName");
const recentReviews = document.getElementById("reviews");
const albumCover = document.getElementById("albumCover");
const albumInfo = document.getElementById("albumInfo");
const AvgRatings = document.getElementById("AvgRatings");

const trackList = document.getElementById("trackList");
const slider = document.getElementById("ratingSlider");
const reviewRating = document.getElementById("currentRating");
const reviewBox = document.getElementById("reviewBox");
const favButtonContainer = document.getElementById("favouriteButtonContainer");

// Event lister
reviewBox.addEventListener('submit', submitNewReview);

let currentReviewRating = 1;

// Runs certain functions once the page is loaded
window.onload = function() {
  // Album object will be returned from a server call
  displayAlbumInfo(McHammerAlbum)
};

function displayAlbumInfo(album) {
  displayCurrentRating(currentReviewRating)
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

   displayAverageRating(album.avgRating);

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

  displayReviews(album.reviews);
  styleFavouriteButton();
}

//Change the favourite button depending on whether the user has already favourited this album.
function styleFavouriteButton() { 
    // At this point, we would see what the current User  is.
    // We would then get there ID from the server.
    // At this stage, we can't do that, so we've just hardcoded in the userid
    const currentUser = tonybaloney;
    // In the same vein, we would get the album ID from the server, and load that
    // in here. At this point, we just hardcoded it.
    const albumID = McHammerAlbum.albumId;
    
    if (currentUser.favAlbums.includes(albumID)) {
      const oldFavButton = favButtonContainer.firstElementChild;
      favButtonContainer.removeChild(oldFavButton);
      const favButton = document.createElement("button");
      favButton.type = "button";
      favButton.className = "favouriteButton dim";
      const unfavText = document.createTextNode("Remove from Favourites");
      favButton.appendChild(unfavText);
      favButtonContainer.insertBefore(favButton, favButtonContainer.firstElementChild);
      favButton.addEventListener("click", function() {removeAlbumFromFavourites(albumID, currentUser)});
    } else {
      const oldFavButton = favButtonContainer.firstElementChild;
      favButtonContainer.removeChild(oldFavButton);
      const favButton = document.createElement("button");
      favButton.type = "button";
      favButton.className = "favouriteButton bright";
      const favText = document.createTextNode("Add to Favourites");
      favButton.appendChild(favText);
      favButtonContainer.insertBefore(favButton, favButtonContainer.firstElementChild);
      favButton.addEventListener("click", function() {addAlbumToFavourites(albumID, currentUser)});
    }
}
function addAlbumToFavourites(albumID, currentUser) {
  // We would make a server call here, but for now we just edit the sample data
  currentUser.favAlbums.push(albumID);
  styleFavouriteButton();
}
function removeAlbumFromFavourites(albumID, currentUser) {
  // We would make a server call here, but for now we just edit the sample data
  for (let i = 0; i < currentUser.favAlbums.length; i++) {
    if (currentUser.favAlbums[i] == albumID) {
      currentUser.favAlbums.splice(i, 1);
    }
  }
  styleFavouriteButton();
}

function displayReviews(reviews) { // Display some recent review
  if( reviews.length != 0) {
    for(let i = 0; i< 3 && i < reviews.length; i++)
    {
      let currentReview = reviews[i];

      // At this point, we would use the albumID and the userID to call the
      // Album from the server. As the info is currently hardcode, we just set these
      // values here
      const reviewAlbum = McHammerAlbum;
      const reviewUser = tonybaloney;

      // Loading the profile picture
      let reviewUserProfile= reviewUser.profilePic;
      const userCoverImg = document.createElement('img')
      userCoverImg.className = 'reviewUserPic';
      userCoverImg.src = reviewUserProfile;

      // linking back to the profile
      const userLink = document.createElement('a')
      userLink.href = '../users/user_' + reviewUser.userid +'.html';
      userLink.appendChild(userCoverImg)

      // loading in the user name
      let reviewUserName = reviewUser.username;
      const reviewUserNameHead = document.createElement('h1')
      reviewUserNameHead.appendChild(document.createTextNode(reviewUserName))

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

      reviewDiv.appendChild(userLink);
      reviewDiv.appendChild(textPara);
      reviewDiv.appendChild(reviewUserNameHead);
      reviewDiv.appendChild(reviewDateHead);
      reviewDiv.appendChild(reviewRatingHead);

      recentReviews.appendChild(reviewDiv);
    }

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
    recentReviews.appendChild(noReviewDiv)
  }
}

// updating the rating of the review being written
slider.oninput = function () {
  displayCurrentRating(this.value);
}

function displayCurrentRating(newRating)  {
    if( newRating != null)
    {
    currentReviewRating = newRating;

    // seeing if the node currently has a child
    if( reviewRating.childNodes.length == 0)
    {
      reviewRating.appendChild(document.createTextNode(currentReviewRating))
    }
    else
    {
      reviewRating.childNodes[0].remove();
      reviewRating.appendChild(document.createTextNode(currentReviewRating))
    }
  }
}

// The review list will be returned from a server call 
function getAverageRating(reviewList)  {
  let currentTotal = 0;
  for( let i = 0; i< reviewList.length; i++)
  {
    currentTotal += reviewList[i].rating;
  }
  return currentTotal/ reviewList.length;
}


function submitNewReview(e)
{
    e.preventDefault();

    // At this point, we would see what the current User  is.
    // We would then get there ID from the server.
    // At this stage, we can't do that, so we've just hardcoded in the userid
    const userID = 0;

    // In the same vein, we would get the album ID from the server, and load that
    // in here. At this point, we just hardcoded it.
    const albumID = McHammerAlbum.albumId;

    const date = new Date();

    const currentDate = new Date(date.getFullYear(),date.getMonth(),date.getDate())

    const reviewBody = e.srcElement.elements.reviewbody.value;

    const reviewRating = parseInt(currentReviewRating);

    const newReview = new reviewData(albumID,userID, currentDate,reviewBody,reviewRating)

    McHammerAlbum.reviews.push(newReview)
    McHammerAlbum.avgRating = getAverageRating( McHammerAlbum.reviews)

    let reviewsDivs = recentReviews.getElementsByClassName("reviewsDiv")
    for(let j = reviewsDivs.length - 1; j >=0; j--)
    {
      reviewsDivs[j].remove();
    }

    displayReviews(McHammerAlbum.reviews);
    displayAverageRating(McHammerAlbum.avgRating)

    // reseting submission box
    currentReviewRating = 1;
    displayCurrentRating(currentReviewRating);
    reviewBox.reset()
}

function displayAverageRating(rating){
  if(AvgRatings.childNodes.length == 4 )
  {
    AvgRatings.childNodes[3].remove()
  }
  const albumRatingText = rating + " Stars"
  const ratingHead = document.createElement('h2')
  ratingHead.appendChild(document.createTextNode(albumRatingText))
  AvgRatings.appendChild(ratingHead)
}
