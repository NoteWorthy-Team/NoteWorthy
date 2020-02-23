
// The below objects are temporary elements, that will be generated using a
// objects that is called from the server
class userInfo {
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

  class friendInfo {
    constructor(userid, username,profilePic, profileLink) {
      this.userid = userid;
      this.username = username;
      this.profilePic = profilePic;
      this.profileLink = profileLink;
    }
  }

  class albumInfo {
    constructor(albumId, albumName,albumCover) {
      this.albumId = albumId;
      this.albumName = albumName;
      this.albumCover = albumCover;
    }
  }

  class reviewData {
    constructor(dateOfReview, albumName,albumCover, reviewBody, rating) {
      this.dateOfReview = dateOfReview;
      this.albumName = albumName;
      this.albumCover = albumCover;
      this.reviewBody = reviewBody;
      this.rating = rating;
    }
  }

  class collectionData {
    constructor( collectionName, description, albums ) {
      this.collectionName = collectionName;
      this.description = description;
      this.albums = albums;
    }
  }

  let friendOne = new friendInfo(1,"csc309", 'csc309.jpg', '');
  let friendTwo = new friendInfo(2,"emptyuser", 'emptyuser.jpg','');

  let sampleFriendList = [];
  sampleFriendList.push(friendOne)
  sampleFriendList.push(friendTwo)

  let favouriteAlbum = new albumInfo(0, " Please Hammer Don’t Hurt ‘Em ", 'please_hammer_dont_hurt_em.jpg');
  let sampleFavAlbumList = [];
  sampleFavAlbumList.push(favouriteAlbum);

  let nothworthyReview = new reviewData( new Date(2018, 11, 24), "Bahen… ",'bahen....jpg',
  "OVERRATED. This album is trash. The instrumentation sucks, the vocals suck, I hate everything about this band and their stupid faces." +
  " I wish I had a time machine so that I could go back in time and stop this album from being created. " +
  "I’m DISTRAUGHT. ",0);

  let hammerReview = new reviewData( new Date(2019, 1, 14), "Please Hammer Don’t Hurt ‘Em ",'please_hammer_dont_hurt_em.jpg',
  "An absolute banger! People are dumb in thinking that this album should only be known for “U Can’t Touch This”. MC Hammer is a true artiste and should be as famous as that garbage band NoteWorthy!",5);

  let sampleReviewList = [];
  sampleReviewList.push(nothworthyReview);
  sampleReviewList.push(hammerReview);

  let sampleCollectionList = [];
  let collectionOneAlbumList = [];
  let collectionAlbum = new albumInfo(1, "Bahen...", 'Bahen....jpg');

  collectionOneAlbumList.push(favouriteAlbum)
  collectionOneAlbumList.push(collectionAlbum)

  let sampleColection =
  new collectionData("Listened ", "Albums this user has listened to",collectionOneAlbumList )

  sampleCollectionList.push(sampleColection) ;

  let helpAlbum = new albumInfo(2,"Help", 'help.jpg');
  let tolistenList = [];
  tolistenList.push(helpAlbum)

  let sampleUser = new userInfo(0,"tonybaloney",'tonybaloney.jpg',
   "You don’t like the things that you like, these are the things you like. Staten, NYC.",
  sampleFriendList, sampleFavAlbumList, sampleReviewList, sampleCollectionList, tolistenList);

  let isDisplayingReviews = true;
  let isDisplayingCollections= false;
  let isDisplayingToListened = false;

  // Runs certain functions once the page is loaded
  window.onload = function() {
    displayUserInfo(sampleUser)
  };

  function displayUserInfo(user)
  {
    // a list of DOM master elements
    const username = document.querySelector('#username');
    const favAlbums = document.querySelector('#favAlbums');
    const userpicture = document.querySelector('#userpicture');
    const bio = document.querySelector('#bio');
    const followlist = document.querySelector('#followlist');

    // adding the user name
    const userName = user.username
    const usernameHeader = document.createElement('H1')
    usernameHeader.appendChild(document.createTextNode(userName))
    username.appendChild(usernameHeader)

    // adding the profile picture
    const pictureSource = user.profilePic
    const userPic = document.createElement('img')
    userPic.className = 'userPic';
    userPic.src = pictureSource;
    userpicture.appendChild(userPic)

    // adding the bio elem
    const userbio = user.bio
    const userbiopara= document.createElement('p')
    userbiopara.appendChild(document.createTextNode(userbio))
    bio.appendChild(userbiopara)

    // display friend list
    // currently just showing th picture and username
    // will change it so that the picture is a link to the other
    // user's profile
    if( user.friendList.length  != 0) {
      for(let i = 0; i< 9 && i < user.friendList.length ; i++)
      {
        let currentFriend = user.friendList[i]

        let friendName = currentFriend.username;
        let friendPicture = currentFriend.profilePic;
        let friendProfile = currentFriend.profileLink;

        const friendNamepara= document.createElement('p')
        const friendPicImg = document.createElement('img')
        const friendPageLink = document.createElement('a')
        const frienddiv = document.createElement('div')

        friendPicImg.className = 'friendPic';
        friendPicImg.src = friendPicture;
        frienddiv.appendChild(friendPicImg)

        frienddiv.className = 'FriendDiv';
        friendNamepara.className = 'followerName';
        friendNamepara.appendChild(document.createTextNode(friendName))

        frienddiv.appendChild(friendNamepara)
        followlist.appendChild(frienddiv)
      }
      // Add a link down here to bring the user to a screen with all of there
      // friends

    }
    // Shows a message telling user to follow someone if they currenly don't s
    else
    {
      const noFriendpara= document.createElement('p')
      const noFriendDiv = document.createElement('div')
      const noFriendMessage = "Visit other user profiles and add them to your follow list"

      noFriendpara.appendChild(document.createTextNode(noFriendMessage))
      noFriendDiv.appendChild(noFriendpara)
      followlist.appendChild(noFriendDiv)
    }

    // display favourite album list
    // currently just showing th picture and album name
    // will change it so that the picture is a link to the other album
    if( user.favAlbums.length != 0) {
      for(let i = 0; i< 4 && i < user.favAlbums.length ; i++)
      {
        let currentAlbum = user.favAlbums[i]

        let albumName = currentAlbum.albumName;
        let albumCover= currentAlbum.albumCover;

        const albumNamepara= document.createElement('p')
        const albumCoverImg = document.createElement('img')
        const albumPageLink = document.createElement('a')
        const albumdiv = document.createElement('div')

        albumCoverImg.className = 'albumCover';
        albumCoverImg.src = albumCover;
        albumdiv.appendChild(albumCoverImg)

        albumdiv.className = 'albumDiv';
        //albumNamepara.className = 'followerName';
        albumNamepara.appendChild(document.createTextNode(albumName))

        albumdiv.appendChild(albumNamepara)
        favAlbums.appendChild(albumdiv)
      }
      // Add a link down here to bring the user to a screen where they can edit their favourite list

    }
    // Shows a message telling user to follow someone if they currenly don't s
    else
    {
      const noFavAlbumPara= document.createElement('p')
      const noFavAlbumDiv = document.createElement('div')
      const noFavAlbumMessage = "Display your favourite albums here"

      noFavAlbumPara.appendChild(document.createTextNode(noFavAlbumMessage))
      noFavAlbumDiv.appendChild(noFavAlbumPara)
      favAlbums.appendChild(noFavAlbumDiv)
    }

    // Displaying the user reviews
    updateUserPanel(user);
  }

  function updateUserPanel(user)
  {
    const userPanel = document.querySelector('#userPanel');
    // remove other divs

    // add reviews Div
    if(isDisplayingReviews)
    {
      // display recent reviews of the users
      if( user.userReviews.length != 0) {
        for(let i = 0; i< 3 && i < user.userReviews.length ; i++)
        {
          let currentReview = user.userReviews[i]

          // Loading the album cover
          let reviewAlbumCover= currentReview.albumCover;
          const albumCoverImg = document.createElement('img')
          albumCoverImg.className = 'reviewAlbumCover';
          albumCoverImg.src = reviewAlbumCover;

          // loading in the album name info
          let reviewAlbumName = currentReview.albumName;
          const reviewAlbumNameHead = document.createElement('h1')
          reviewAlbumNameHead.appendChild(document.createTextNode(reviewAlbumName))

          // loading in the review date
          let reviewDate = "Reviewed on: \n"
          + currentReview.dateOfReview.getDate() +"/  "
          + currentReview.dateOfReview.getMonth() +"/ "+
          + currentReview.dateOfReview.getFullYear()

          const reviewDateHead = document.createElement('h2')
          reviewDateHead.appendChild(document.createTextNode(reviewDate))

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
          reviewDiv.appendChild(albumCoverImg);

          reviewDiv.appendChild(textPara);
          reviewDiv.appendChild(reviewAlbumNameHead);
          reviewDiv.appendChild(reviewDateHead);
          reviewDiv.appendChild(reviewRatingHead);

          userPanel.appendChild(reviewDiv);
        }
        // Add a link down here to bring the user to a screen where they can edit their favourite list

      }
      // Shows a message telling user to write some reviews
      else
      {
        const noReviewsPara= document.createElement('p')
        const noReviewDiv = document.createElement('div')

        noReviewDiv.className = 'messageDiv'
        const noReviewMessage = "Try writing a review!"

        noReviewsPara.appendChild(document.createTextNode(noReviewMessage))
        noReviewDiv.appendChild(noReviewsPara)
        userPanel.appendChild(noReviewDiv)
      }
    }

    // add collection divs
    else if (isDisplayingCollections ) {
      if( user.userCollections.length != 0) {
        for(let i = 0; i< 3 && i < user.userCollections.length ; i++)
        {
          let currentCollections = user.userCollections[i]

          let albumList  = currentCollections.albums;
          let collNameText = currentCollections.collectionName;
          let collDesText = currentCollections.description;

          let collAlbumDiv = document.createElement('div');
          collAlbumDiv.className = 'collectionAlbumDiv'

          // loading in the album covers
          for(let i =0; i < 4; i++) {
            let currentAlbumCoverImg = document.createElement('img')
            currentAlbumCoverImg.className = 'collectionAlbumCover'
            if( i < albumList.length )
            {
              currentAlbumCoverImg.src = albumList[i].albumCover
            }
            else
            {
              currentAlbumCoverImg.src = 'grey.jpg'
            }
            collAlbumDiv.appendChild(currentAlbumCoverImg)
          }

          let collectionNameHead = document.createElement('h1');
          collectionNameHead.appendChild(document.createTextNode(collNameText))

          let collectionDisPara = document.createElement('p');
          collectionDisPara.appendChild(document.createTextNode(collDesText))

          let collDiv = document.createElement('div');
          collDiv.className = 'collectionDiv'

          collDiv.appendChild(collAlbumDiv)
          collDiv.appendChild(collectionNameHead)
          collDiv.appendChild(collectionDisPara)
          userPanel.appendChild(collDiv);
        }

        // Add a link down here to bring the user to a screen where they can edit their collections
        // Be able to expand the collections

      }
      // Shows a message telling user to write some reviews
      else
      {
        const noReviewsPara= document.createElement('p')
        const noReviewDiv = document.createElement('div')

        noReviewDiv.className = 'messageDiv'
        const noReviewMessage = "Try creating a collection of albums!"

        noReviewsPara.appendChild(document.createTextNode(noReviewMessage))
        noReviewDiv.appendChild(noReviewsPara)
        userPanel.appendChild(noReviewDiv)
      }
    }

    // display the albums that the user has marked that they want to listen to
    else if (isDisplayingToListened )
    {
      //constructor(albumId, albumName,albumCover) {
      if( user.userListList.length != 0) {
        for(let i = 0; i< 9 && i < user.userListList.length ; i++)
        {
            let currentWantToListem = user.userListList[i]

            let toListenAlbumName = currentWantToListem.albumName;
            let toListenAlbumCover = currentWantToListem.albumCover;


            const albumNamepara= document.createElement('p')
            const albumPicImg = document.createElement('img')
            const albumdiv = document.createElement('div')

            albumPicImg.className = 'toListenCover';
            albumPicImg.src = toListenAlbumCover;
            console.log(albumPicImg.src)
            albumdiv.appendChild(albumPicImg)

            albumdiv.className = 'lisListDiv';
            albumNamepara.appendChild(document.createTextNode(toListenAlbumName))

            albumdiv.appendChild(albumNamepara)

            userPanel.appendChild(albumdiv);
        }

        // Add a link down here to bring the user to a screen where they can edit their collections
        // Be able to expand the collections

      }
      // Shows a message telling user to write some reviews
      else
      {
        const noReviewsPara= document.createElement('p')
        const noReviewDiv = document.createElement('div')

        noReviewDiv.className = 'messageDiv'
        const noReviewMessage = "Mark albums you want to listen to!"

        noReviewsPara.appendChild(document.createTextNode(noReviewMessage))
        noReviewDiv.appendChild(noReviewsPara)
        userPanel.appendChild(noReviewDiv)
      }

    }
  }
