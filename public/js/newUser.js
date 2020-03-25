// JS for page to add new user

// Runs certain functions once the page is loaded
let numberOfUsers = null;
const newuserForm = document.getElementsByClassName("NewUserForm")[0];
newuserForm.addEventListener('submit', addUser);

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

// A function to send a POST request with a new user
// Using this atm to add our users to the database
function addUser(e) {
  e.preventDefault(e); // prevent default form action
  const displayName = e.srcElement.elements.DisplayName.value;
  const password = e.srcElement.elements.password.value;
  const bio = e.srcElement.elements.Bio.value;
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
    bio: bio
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
          displayMessage.appendChild(document.createTextNode("User has been made, please login in with " + loginName ))

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
      .then((json) => {  // the resolved promise with the JSON body
        console.log(json)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
      console.log(`Error Code: ${json.status}`)
       console.log(`Error URL: ${json.url}`)
       console.log(`Error body: ${json.body}`)
      // console.log(`Error json: ${json}`)
       const body  = JSON.stringify(json, ' ', 4)
       console.log(`Error body: ${body}`)

    }).catch((error) => {
        console.log(error)
  })
}
