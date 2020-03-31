// JS page for albums

"use strict";

// a list of DOM master elements
const navbar = document.getElementById("navbar");
const albumName = document.getElementById("albumName");
const recentReviews = document.getElementById("reviews");
const cover = document.getElementById("albumCover");
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
let album = null;

let isFavourite = false;
let isListened = false;
let isToListen = false;

// Runs certain functions once the page is loaded
window.onload = function() {
  // the URL for the request
  const url = '/albuminfo';

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    album = json.album
    displayAlbumInfo(album)
    checkIfFavourite()
    checkIfListened()
    checkIfListenTo()

  }).catch((error) => {
  })
}

function displayAlbumInfo(album) {
  displayCurrentRating(currentReviewRating)
  // adding the album name
  const albumNametext = album.name
  const albumNameHeader = document.createElement('H1')
  albumNameHeader.appendChild(document.createTextNode(albumNametext))
  albumName.appendChild(albumNameHeader)

  // displaying the album cover
  const coverSrc = album.cover
  const coverImg = document.createElement('img')
  coverImg.className = 'coverPic';
  coverImg.src = coverSrc
  cover.appendChild(coverImg)

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

  displayReviews(album.Reviews);
}

function displayReviews(reviews) { // Display some recent review
  let messageDivs = recentReviews.getElementsByClassName("messageDiv")
  for(let j = messageDivs.length - 1; j >=0; j--)
  {
    messageDivs[j].remove();
  }

  if( reviews.length != 0) {
    for(let i = 0; i< 3 && i < reviews.length; i++)
    {
      let currentReview = reviews[i];
      const reviewUser = currentReview.user;

      // Loading the profile picture
      let reviewUserProfile= reviewUser.profilePic;
      const userCoverImg = document.createElement('img')
      userCoverImg.className = 'reviewUserPic';
      userCoverImg.src = reviewUserProfile;
      userCoverImg._id = reviewUser._id

      // loading in the user name
      let reviewUserName = reviewUser.displayName;
      const reviewUserNameHead = document.createElement('h1')
      reviewUserNameHead.appendChild(document.createTextNode(reviewUserName))
      reviewUserNameHead._id = reviewUser._id

      // loading in the review date
      let reviewDatePreBreak = "Reviewed on: ";


      let reviewDatePostBreak = currentReview.dateOfReview.split('T')[0];

      const reviewDateHead = document.createElement('h2')
      reviewDateHead.appendChild(document.createTextNode(reviewDatePreBreak))
      reviewDateHead.appendChild(document.createElement('br'))
      reviewDateHead.appendChild(document.createTextNode(reviewDatePostBreak))

      reviewDateHead._id = reviewUser._id

      // loading in the rating
      let reviewRating = "Rating: " + currentReview.rating + "/5"

      const reviewRatingHead = document.createElement('h2')
      reviewRatingHead.appendChild(document.createTextNode(reviewRating))
      reviewRatingHead._id = reviewUser._id

      // loading the text of the review
      let reviewText = currentReview.reviewBody;

      const textPara= document.createElement('p')
      textPara.appendChild(document.createTextNode(reviewText));
      textPara._id = reviewUser._id
      // adding elements to the review div
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'reviewsDiv';
      reviewDiv._id = reviewUser._id

      reviewDiv.appendChild(userCoverImg);
      reviewDiv.appendChild(textPara);
      reviewDiv.appendChild(reviewUserNameHead);
      reviewDiv.appendChild(reviewDateHead);
      reviewDiv.appendChild(reviewRatingHead);
      reviewDiv.addEventListener('click', toToUserPage)

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

/// REVIEW FUNCTIONS

// when we submit a new review, we need to create return the
// current users as a Viewable user, and then save the review to the album
// and the user
function submitNewReview(e){
  e.preventDefault();

  const url = '/userViewable';
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      console.log("got user viewable")
      return res.json()
    }
    else
    {
      console.log("Did not get user viewable ")
        return res.json()
    }
  })
  .then((viewUser) => {  // the resolved promise with the JSON body
    console.log(viewUser)

    const date = new Date();

    const currentDate = new Date(date.getFullYear(),date.getMonth(),date.getDate())

     const reviewData = {
       _id: album._id,
       name: album.name,
       cover: album.cover,
       user: viewUser,
       dateOfReview:currentDate,
       reviewBody: e.srcElement.elements.reviewbody.value,
       rating: parseInt(currentReviewRating)
     }

      let reviewsDivs = recentReviews.getElementsByClassName("reviewsDiv")
      for(let j = reviewsDivs.length - 1; j >=0; j--)
      {
        reviewsDivs[j].remove();
      }

      saveReviewToUser(reviewData)
      saveReviewToAlbum(reviewData)

      // reseting submission box
      currentReviewRating = 1;
      displayCurrentRating(currentReviewRating);
      reviewBox.reset()
  }).catch((error) => {
    console.log("review error")
  })
}

function saveReviewToUser(reviewData) {
    console.log(reviewData)
    const url = '/saveReviewUser';

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(reviewData),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    });

    fetch(request)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
          console.log("Saved review to user")
          console.log(res.json() )
      } else {
          console.log("did not saved  review to user")
      }
    })
}

function saveReviewToAlbum(reviewData) {
  const url = '/saveReviewAlbum';

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(reviewData),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });
  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      console.log("Saved review to album")
      return res.json()
    } else {
      console.log("did not saved review to album")

    }
  }).then((json) => {  // the resolved promise with the JSON body
    album = json.album
    displayReviews(album.Reviews);
    displayAverageRating(album.avgRating)
  }).catch((error) => {
  })
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

function toToUserPage(e) {
  console.log("Clicked on div")
  const url = '/viewUser';

  const data = {
    userID: e.toElement._id
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      console.log("view set")
      window.location = URL+ 'dashboard_viewable'
    }
  }).catch((error) => {
    console.log(error)
  })
}


//FAVOURITE ALBUM FUNCTIONS
// Checking if the user has favourited this album

function checkIfFavourite() {
  const url = '/albumFavourite';
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
    }
  })
  .then((favouriteAlbum) => {  // the resolved promise with the JSON body
    for( let i = 0; i < favouriteAlbum.length; i++ )
    {
      if(favouriteAlbum[i]._id == album._id )
      {
        isFavourite = true
      }
    }
    styleFavouriteButton();
  }).catch((error) => {
  })
}

// Add the album to the current user's favours
function addToFavourites(e) {
  isFavourite = true

  const url = '/favourAlbum';

  const data = {
    albumID: album._id,
    name: album.name,
    cover: album.cover
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleFavouriteButton();
  }).catch((error) => {
  })
}

// Removing this album from the user's favours
function removeFromFavourites(e) {

  isFavourite = false

  const url = '/unfavourAlbum';

  const data = {
    albumID: album._id
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleFavouriteButton();
  }).catch((error) => {
  })
}

//Change the favourite button depending on whether the user has already favourited this album.
function styleFavouriteButton() {
  if (isFavourite) {
    const containerButton = favButtonContainer.childNodes;
    const oldFavButton = containerButton[1]

    const favButton = document.createElement("button");
    favButton.type = "button";
    favButton.className = "favouriteButton dim";
    const unfavText = document.createTextNode("Remove from Favourites");
    favButton.appendChild(unfavText);

    favButtonContainer.insertBefore(favButton, oldFavButton);
    favButtonContainer.removeChild(oldFavButton);
    favButton.addEventListener("click", removeFromFavourites);
  }
  else {
    const containerButton = favButtonContainer.childNodes;
    const oldFavButton = containerButton[1]

    const favButton = document.createElement("button");
    favButton.type = "button";
    favButton.className = "favouriteButton bright";
    const favText = document.createTextNode("Add to Favourites");
    favButton.appendChild(favText);

    favButtonContainer.insertBefore(favButton, oldFavButton);
    favButtonContainer.removeChild(oldFavButton);
    favButton.addEventListener("click", addToFavourites);
  }
}


// LISTENED FUNCTIONALITY
function checkIfListened() {
  const url = '/albumListened';
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
    }
  })
  .then((listenedAlbum) => {
    for( let i = 0; i < listenedAlbum.length; i++ )
    {
      if(listenedAlbum[i]._id == album._id )
      {
        isListened = true
      }
    }
    styleListenButton();
  }).catch((error) => {
  })
}

// Add the album to the current user's to listen
function addToListened(e) {
  isListened = true

  const url = '/addListenedAlbum';

  const data = {
    albumID: album._id,
    name: album.name,
    cover: album.cover
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleListenButton()
  }).catch((error) => {
  })
}

// Removing this album from the user's favours
function removeFromListened(e) {
  isListened = false

  const url = '/removeFromListened';

  const data = {
    albumID: album._id
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleListenButton();
  }).catch((error) => {
  })
}


//Change the to Listen  button depending on whether the user has marked this album
function styleListenButton() {
  if (isListened) {
  const containerButton = favButtonContainer.childNodes;
  const oldLisButton = containerButton[3]

  const lisButton = document.createElement("button");
  lisButton.type = "button";
  lisButton.className = "listenButton dim";
  const unfavText = document.createTextNode("Remove from Listened");
  lisButton.appendChild(unfavText);

  favButtonContainer.insertBefore(lisButton, oldLisButton);
  favButtonContainer.removeChild(oldLisButton);
  lisButton.addEventListener("click", removeFromListened);
  }
  else {
    const containerButton = favButtonContainer.childNodes;
    const oldLisButton = containerButton[3]

    const lisButton = document.createElement("button");
    lisButton.type = "button";
    lisButton.className = "listenButton bright";
    const unfavText = document.createTextNode("Add To Listened");
    lisButton.appendChild(unfavText);

    favButtonContainer.insertBefore(lisButton, oldLisButton);
    favButtonContainer.removeChild(oldLisButton);
    lisButton.addEventListener("click", addToListened);
  }
}

// TO LISTEN FUNCTIONALITY
function checkIfListenTo() {
  const url = '/albumtoListen';
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
    }
  })
  .then((listenAlbum) => {
    for( let i = 0; i < listenAlbum.length; i++ )
    {
      if(listenAlbum[i]._id == album._id )
      {
        isToListen = true
      }
    }
    styleToLoistenButton();
  }).catch((error) => {
  })
}

// Add the album to the current user's to listen
function addToListen(e) {
  isToListen = true

  const url = '/toListenAlbum';

  const data = {
    albumID: album._id,
    name: album.name,
    cover: album.cover
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleToLoistenButton()
  }).catch((error) => {
  })
}

// Removing this album from the user's favours
function removeFromToListen(e) {
  isToListen = false

  const url = '/removeToList';

  const data = {
    albumID: album._id
  }

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      return res.json()
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    styleToLoistenButton();
  }).catch((error) => {
  })
}

//Change the toListen  button depending on whether the user has marked this album
function styleToLoistenButton() {
  if (isToListen) {
  const containerButton = favButtonContainer.childNodes;
  const oldLisButton = containerButton[5]

  const lisButton = document.createElement("button");
  lisButton.type = "button";
  lisButton.className = "toListenButton dim";
  const unfavText = document.createTextNode("Remove from To Listen");
  lisButton.appendChild(unfavText);

  favButtonContainer.insertBefore(lisButton, oldLisButton);
  favButtonContainer.removeChild(oldLisButton);
  lisButton.addEventListener("click", removeFromToListen);
  }
  else {
    const containerButton = favButtonContainer.childNodes;
    const oldLisButton = containerButton[5]

    const lisButton = document.createElement("button");
    lisButton.type = "button";
    lisButton.className = "toListenButton bright";
    const unfavText = document.createTextNode("Add To Listen");
    lisButton.appendChild(unfavText);

    favButtonContainer.insertBefore(lisButton, oldLisButton);
    favButtonContainer.removeChild(oldLisButton);
    lisButton.addEventListener("click", addToListen);
  }
}
