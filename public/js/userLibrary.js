
/*

Also need to link to album search correctly

*/

  let isDisplayingReviews = true;
  let isDisplayingCollections= false;
  let isDisplayingToListened = false;

  let currentUser =null;

  // a list of DOM master elements
  const username = document.getElementById("username");
  const favAlbums = document.getElementById("favAlbums");
  const userpicture = document.getElementById("userpicture");
  const userPanel = document.getElementById("userPanel");
  const bio = document.getElementById("bio");
  const followlist = document.getElementById("followlist");
  const friendListLink = document.getElementById("friendpage");

  const reviewButton = userPanel.getElementsByClassName("reviews");
  const collectionButton = userPanel.getElementsByClassName("collections");
  const toListenButton  = userPanel.getElementsByClassName("toListen");

  reviewButton[0].addEventListener('click',panelReviewUpdate)
  collectionButton[0].addEventListener('click',panelCollectionUpdate)
  toListenButton[0].addEventListener('click',paneltoListenpdate)
  /* Event listeners for user panel click */


  // Runs certain functions once the page is loaded
  window.onload = function() {
    // the URL for the request
    const url = '/userinfo';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json()
      } else {
        console.log('Could not get user info')
      }
    })
    .then((json) => {  // the resolved promise with the JSON body
      currentUser = json.user
      displayUserInfo(currentUser)
    }).catch((error) => {
      console.log(error)
    })
  }

  // may need to update this as we add more stuff to display
  function displayUserInfo(user)
  {
    // adding the user name
    const userName = user.displayName
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
    if( user.friendList.length  != 0) {
      for(let i = 0; i< 9 ; i++)
      {
        const friendNamepara= document.createElement('p')
        const friendPicImg = document.createElement('img')
        const frienddiv = document.createElement('div')

        let friendName = null;
        let friendPicture = null;

        if( i < user.friendList.length  )
        {
            const currentFriend = user.friendList[i];

            friendPicImg._id = currentFriend._id
            friendNamepara._id = currentFriend._id
            frienddiv._id = currentFriend._id

            friendName = currentFriend.displayName;
            friendPicture = currentFriend.profilePic;
            frienddiv.appendChild(friendPicImg)
            frienddiv.addEventListener('click', toToUserPage)
        }
        else
        {
          friendName = "";
          friendPicture = 'https://res.cloudinary.com/keatingh/image/upload/v1585233976/qvjid5ncxmq4n5a6hqzf.jpg'
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

        let albumName = currentAlbum.name;
        let cover= currentAlbum.cover;
        let albumid = currentAlbum._id;

        const albumNamepara= document.createElement('p')
        const coverImg = document.createElement('img')
        const albumdiv = document.createElement('div')

        albumNamepara._id = albumid
        coverImg._id = albumid
        albumdiv._id = albumid

        coverImg.className = 'cover';
        coverImg.src = cover;

        albumdiv.className = 'albumDiv';
        albumNamepara.appendChild(document.createTextNode(albumName))

        albumdiv.appendChild(coverImg)
        albumdiv.appendChild(albumNamepara)

        albumdiv.addEventListener('click', toAlbumPage)
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
    updateUserPanel(currentUser);
  }

  function panelCollectionUpdate(e) {
    e.preventDefault();
    isDisplayingReviews = false;
    isDisplayingCollections= true;
    isDisplayingToListened = false;
    updateUserPanel(currentUser);
  }

  function paneltoListenpdate(e) {
    e.preventDefault();
    isDisplayingReviews = false;
    isDisplayingCollections= false;
    isDisplayingToListened = true;
    updateUserPanel(currentUser);
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
          let reviewcover= currentReview.album.cover;
          const coverImg = document.createElement('img')
          coverImg.className = 'reviewAlbumCover';
          coverImg.src = reviewcover;

          // loading in the album name info
          let reviewAlbumName = currentReview.album.name;
          const reviewAlbumNameHead = document.createElement('h1')
          reviewAlbumNameHead.appendChild(document.createTextNode(reviewAlbumName))

          // loading in the review date
          let reviewDatePreBreak = "Reviewed on: ";


          let reviewDatePostBreak = currentReview.dateOfReview.split('T')[0];

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
          reviewDiv.appendChild(coverImg);

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
            let currentcoverImg = document.createElement('img')
            currentcoverImg.className = 'collectioncover'
            if( i < albumList.length )
            {
              currentcoverImg.src = albumList[i].cover
            }
            else
            {
              currentcoverImg.src = 'https://res.cloudinary.com/keatingh/image/upload/v1585233976/qvjid5ncxmq4n5a6hqzf.jpg'
            }
            collAlbumDiv.appendChild(currentcoverImg)
          }

          let collectionLink = document.createElement('a')
          collectionLink.href = 'user_0_collection.html'
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
      if( user.userToListen.length != 0) {
        for(let i = 0; i< 9 && i < user.userToListen.length ; i++)
        {
          let currentWantToListem = user.userToListen[i]

          let toListenAlbumName = currentWantToListem.name;
          let toListencover = currentWantToListem.cover;
          let albumid = currentWantToListem._id;

          const albumNamepara= document.createElement('p')
          const albumPicImg = document.createElement('img')
          const albumdiv = document.createElement('div')

          albumNamepara._id = albumid
          albumPicImg._id = albumid
          albumdiv._id = albumid

          albumPicImg.className = 'toListenCover';
          albumPicImg.src = toListencover;

          albumdiv.appendChild(albumPicImg)

          albumdiv.className = 'lisListDiv';
          albumNamepara.appendChild(document.createTextNode(toListenAlbumName))

          albumdiv.addEventListener('click', toAlbumPage)
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

function toAlbumPage(e) {
    console.log("Clicked on div")
    const url = '/viewAlbum';

    const data = {
      albumID: e.toElement._id
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
        window.location = URL+ 'album'
      }
    }).catch((error) => {
      console.log(error)
    })
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
