  let currentUser =null;

  // a list of DOM master elements
  const users = document.getElementById("users");

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
    displayFriends(currentUser)
  }).catch((error) => {
    console.log(error)
  })
}

function displayFriends(user){
  for(let i = 0; i <user.friendList.length; i++ ) {

  const currentAlbum = user.friendList[i]

  console.log(currentAlbum)
  const friendName= document.createElement('h2')
  const friendPicImg = document.createElement('img')
  const frienddiv = document.createElement('div')
  const userInfoDiv = document.createElement('div')

  friendName._id = currentAlbum._id
  friendPicImg._id = currentAlbum._id
  frienddiv._id = currentAlbum._id
  userInfoDiv._id = currentAlbum._id

  friendPicImg.className ="profilePicture"
  friendPicImg.src = currentAlbum.profilePic


  friendName.appendChild(document.createTextNode(currentAlbum.displayName))

  userInfoDiv.className = "userInfo"
  userInfoDiv.appendChild(friendName)

  frienddiv.className = "user"
  frienddiv.appendChild(friendPicImg)
  frienddiv.appendChild(userInfoDiv)

  frienddiv.addEventListener('click', toToUserPage)

  users.appendChild(frienddiv)

  }
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
