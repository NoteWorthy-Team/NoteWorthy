// CSc309 Profile


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
    constructor(dateOfReview,albumId, albumName,albumCover, reviewBody, rating) {
      this.dateOfReview = dateOfReview;
      this.albumId = albumId;
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

  let friendOne = new friendInfo(0,"tonybaloney", '../samples/sample_profile_pictures/tonybaloney.jpg', '');

  let sampleFriendList = [];
  sampleFriendList.push(friendOne)

  let hammerAlbum  = new albumInfo(0, " Please Hammer Don’t Hurt ‘Em ", '../samples/sample_album_art/please_hammer_dont_hurt_em.jpg');
  let noteWorthyAlbum  = new albumInfo(1, "Bahen...", '../samples/sample_album_art/Bahen....jpg');
  let helpAlbum  = new albumInfo(2, "Help!", '../samples/sample_album_art/help.jpg');

  let sampleFavAlbumList = [];
  sampleFavAlbumList.push(noteWorthyAlbum);

  let nothworthyReview = new reviewData( new Date(2020, 11, 12),1, "Bahen… ",'../samples/sample_album_art/bahen....jpg',
  "A wonderful debut for truly the best new thing in music. Rarely in today’s music landscape has a band been able to take over as NoteWorthy has. Up and down the track list there is not a track that can be singled out as they are all so good. "+
   "This album is quintessential listening to anyone with even a single ear.",5);

  let helpReview = new reviewData( new Date(2019, 1, 14), 1,
  "Help!",'../samples/sample_album_art/help.jpg',
  "Help! cannot be talked about without talking about the film of the same name by the Beatles. When spoken about, the album itself is " +
  "often overshadowed by the film. Don’t get me wrong it’s a great film but the album deserves more attention from the general public and the Beatles fanbase. "+
  "I would even go as far as lumping it with Rubber Soul and Revolver as albums that truly reflected the maturation of the Beatles."
  ,4);

  let sampleReviewList = [];
  sampleReviewList.push(helpReview);
  sampleReviewList.push(nothworthyReview);

  let sampleCollectionList = [];
  let collectionOneAlbumList = [];

  collectionOneAlbumList.push(noteWorthyAlbum)
  collectionOneAlbumList.push(helpAlbum)

  let sampleColection =
  new collectionData("Listened ", "Albums this user has listened to",collectionOneAlbumList )

  sampleCollectionList.push(sampleColection) ;

  let tolistenList = [];
  tolistenList.push(hammerAlbum)

  let cscUser = new userInfo(0,"csc309 ",'../samples/sample_profile_pictures/csc309.jpg',
  "Making jazz with a lot of pizzazz. Toronto, ON." ,
  sampleFriendList, sampleFavAlbumList, sampleReviewList, sampleCollectionList, tolistenList);


  let isDisplayingReviews = true;
  let isDisplayingCollections= false;
  let isDisplayingToListened = false;

  // a list of DOM master elements
  const username = document.getElementById("username");
  const favAlbums = document.getElementById("favAlbums");
  const userpicture = document.getElementById("userpicture");
  const userPanel = document.getElementById("userPanel");
  const bio = document.getElementById("bio");
  const followlist = document.getElementById("followlist");

  const reviewButton = userPanel.getElementsByClassName("reviews");
  const collectionButton = userPanel.getElementsByClassName("collections");
  const toListenButton  = userPanel.getElementsByClassName("toListen");

  reviewButton[0].addEventListener('click',panelReviewUpdate)
  collectionButton[0].addEventListener('click',panelCollectionUpdate)
  toListenButton[0].addEventListener('click',paneltoListenpdate)
  /* Event listeners for user panel click */


  // Runs certain functions once the page is loaded
  window.onload = function() {
    displayUserInfo(cscUser)
  };

  function displayUserInfo(user)
  {

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
    const friendListLink = document.getElementById("friendpage");
    if( user.friendList.length  != 0) {
      for(let i = 0; i< 9 ; i++)
      {
        const friendNamepara= document.createElement('p')
        const friendPicImg = document.createElement('img')
        const friendPageLink = document.createElement('a')
        const frienddiv = document.createElement('div')

        let friendName = null;
        let friendPicture = null;
        let friendProfile = null;

        if( i < user.friendList.length  )
        {
            const currentFriend = user.friendList[i];
            friendName = currentFriend.username;
            friendProfile = currentFriend.profileLink;
            friendPicture = currentFriend.profilePic;
            friendPageLink.href = '../users/user_veiwable_' + currentFriend.userid +'.html';
            friendPageLink.appendChild(friendPicImg)
            frienddiv.appendChild(friendPageLink)
        }
        else
        {
          friendName = "";
          friendProfile = '';
          friendPicture = '../samples/sample_album_art/grey.jpg'
          frienddiv.appendChild(friendPicImg)
        }

        friendPicImg.className = 'friendPic';
        friendPicImg.src = friendPicture;

        frienddiv.className = 'FriendDiv';
        friendNamepara.className = 'followerName';
        friendNamepara.appendChild(document.createTextNode(friendName))

        frienddiv.appendChild(friendNamepara)
        followlist.insertBefore(frienddiv,friendListLink )

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
    // currently just showing the picture and album name
    // will change it so that the picture is a link to the album
    if( user.favAlbums.length != 0) {
      const editPage = document.getElementById("editTopAlbum");
      for(let i = 0; i< 4 && i < user.favAlbums.length ; i++)
      {
        let currentAlbum = user.favAlbums[i]

        let albumName = currentAlbum.albumName;
        let albumCover= currentAlbum.albumCover;

        const albumNamepara= document.createElement('p')
        const albumCoverImg = document.createElement('img')
        const albumPageLink = document.createElement('a')
        const albumdiv = document.createElement('div')
        const albumLink = document.createElement('a')

        albumCoverImg.className = 'albumCover';
        albumCoverImg.src = albumCover;

        albumLink.href = '../albums/album_' + currentAlbum.albumId +'.html';
        albumLink.appendChild(albumCoverImg)

        albumdiv.className = 'albumDiv';
        //albumNamepara.className = 'followerName';
        albumNamepara.appendChild(document.createTextNode(albumName))

        albumdiv.appendChild(albumLink)
        albumdiv.appendChild(albumNamepara)

        favAlbums.insertBefore(albumdiv,editPage )

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

  function panelReviewUpdate(e) {
    e.preventDefault();
    isDisplayingReviews = true;
    isDisplayingCollections= false;
    isDisplayingToListened = false;
    updateUserPanel(cscUser);

  }

  function panelCollectionUpdate(e) {
    e.preventDefault();
    isDisplayingReviews = false;
    isDisplayingCollections= true;
    isDisplayingToListened = false;
    updateUserPanel(cscUser);
  }

  function paneltoListenpdate(e) {
    e.preventDefault();
    isDisplayingReviews = false;
    isDisplayingCollections= false;
    isDisplayingToListened = true;
    updateUserPanel(cscUser);
  }

  function updateUserPanel(user)
  {
    const reviewsDivList = userPanel.getElementsByClassName("reviewsDiv");
    const collectionDivList = userPanel.getElementsByClassName("collectionDiv");
    const toListenDivlist = userPanel.getElementsByClassName("lisListDiv");
    const messageDivList = userPanel.getElementsByClassName("messageDiv");

    for(let i= messageDivList.length -1; i >= 0; i--) {
      userPanel.removeChild(messageDivList.item(i))
    }


    for(let i= reviewsDivList.length -1; i >= 0; i--) {
      userPanel.removeChild(reviewsDivList.item(i))
    }

    for(let i= collectionDivList.length -1; i >= 0; i--) {
      userPanel.removeChild(collectionDivList.item(i))
    }

    for(let i= toListenDivlist.length -1; i >= 0; i--) {
      userPanel.removeChild(toListenDivlist.item(i))
    }

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

          // Creating the link to the album page
          const albumLink = document.createElement('a')
          albumLink.href = '../albums/album_' + currentReview.albumId +'.html';
          albumLink.appendChild(albumCoverImg)

          // loading in the album name info
          let reviewAlbumName = currentReview.albumName;
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
              currentAlbumCoverImg.src = '../samples/sample_album_art/grey.jpg'
            }
            collAlbumDiv.appendChild(currentAlbumCoverImg)
          }

          let collectionLink = document.createElement('a')
          collectionLink.href = 'user_1_collection.html'
          let collectionNameHead = document.createElement('h1');
          collectionNameHead.appendChild(document.createTextNode(collNameText))
          collectionLink.appendChild(collectionNameHead)

          let collectionDisPara = document.createElement('p');
          collectionDisPara.appendChild(document.createTextNode(collDesText))

          let collDiv = document.createElement('div');
          collDiv.className = 'collectionDiv'

          collDiv.appendChild(collAlbumDiv)
          collDiv.appendChild(collectionLink)
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

          const albumLink = document.createElement('a')
          albumLink.href = '../albums/album_' + currentWantToListem.albumId +'.html';
          albumLink.appendChild(albumPicImg)
          albumdiv.appendChild(albumLink)

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
