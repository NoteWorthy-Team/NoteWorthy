// JS for page to add new user
let URL = 'https://lit-dawn-95381.herokuapp.com/'  // Website url 

// Runs certain functions once the page is loaded
let numberOfUsers = null;
let photoURL = null;
const newuserForm = document.getElementsByClassName("NewUserForm")[0];
newuserForm.addEventListener('submit', addUser);

const newProfilePhoto = document.getElementsByClassName("newPhotoForm")[0];
newProfilePhoto.addEventListener('submit', getPhotoUrl);

window.onload = function() {
  // the URL for the request
  const url = '/users';

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      alert('Could not get students')
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    console.log(json.users)
    numberOfUsers = json.users.length;
  }).catch((error) => {
    console.log(error)
  })
}


function getPhotoUrl(e) {
  e.preventDefault(); // prevent default form action
  const url = "/image";

  // The data we are going to send in our request
  const imageData = new FormData(e.target);

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: imageData,
  });

  // Send the request with fetch()
  fetch(request)
  .then(function (res) {
    // Handle response we get from the API.
    // Usually check the error codes to see what happened.
    if (res.status === 200) {
      // If image was added successfully, tell the user.
      console.log("worked")
      const displayMessage = document.getElementById("displayMessage");
      displayMessage.appendChild(document.createTextNode("Profile picture submitted!"))
      displayMessage.appendChild(document.createElement('br'))
      return res.json()
    } else {
      // If server couldn't add the image, tell the user.
      // Here we are adding a generic message, but you could be more specific in your app.
      console.log("Failed")
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
      console.log('Have URL')
    photoURL = json.url;
    console.log(photoURL)
  }).catch((error) => {
    console.log(error)
  })
}

// A function to send a POST request with a new user
// Using this atm to add our users to the database
function addUser(e) {
  e.preventDefault(); // prevent default form action
  const displayName = e.srcElement.elements.DisplayName.value;
  const password = e.srcElement.elements.password.value;
  const bio = e.srcElement.elements.Bio.value;

  if( photoURL == null )
  {
    // displays this warning message in red
    const displayMessage = document.getElementById("displayMessage");
    const notif = document.createElement('p')
    notif.className = 'notif'
    notif.appendChild(document.createTextNode("Submit your profile picture first!"))
    displayMessage.appendChild(notif)
    return;
  }

  // the URL for the request
  const url = '/users';

  let loginName = null;
  if( numberOfUsers == 0)
  {
    loginName = "user"
  }
  else  {
  loginName= "user" + numberOfUsers.toString()
  }

//  The data we are going to send in our request
  let data = {
    loginName: loginName,
    password: password ,
    displayName: displayName,
    bio: bio,
    photoURL: photoURL
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

  // Send the request with fetch()
  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          // If student was added successfully, tell the user.
          console.log('Added user')
          const displayMessage = document.getElementById("displayMessage");
          const logInHere = document.createElement('a')
          logInHere.href = URL
          logInHere.appendChild(document.createTextNode("HERE"))
          displayMessage.appendChild(document.createTextNode("User has been created, please log in with the name '" + loginName + "' " ))
          displayMessage.appendChild(document.createElement('br'))
          displayMessage.appendChild(logInHere)
      }

       else {
          // If server couldn't add the student, tell the user.
          // Here we are adding a generic message, but you could be more specific in your app.
            console.log('Could not add user')
            const displayMessage = document.getElementById("displayMessage");
            displayMessage.appendChild(document.createTextNode("Sorry we couldn't make a user at this time, please contact the admin team"))
      }
      return res.json();
    })
}
