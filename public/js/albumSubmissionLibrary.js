// code for submit button

let photoURL = "";
const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", handleFormSubmit)

const newProfilePhoto = document.getElementsByClassName("newPhotoForm")[0];
newProfilePhoto.addEventListener('submit', getPhotoURl);
console.log(newProfilePhoto)

function getPhotoURl(e) {
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
  }).catch((error) => {
    console.log(error)
  })
}

function handleFormSubmit(e) {
    e.preventDefault();
    const albumTitle = document.querySelector('#albumTitle').value
    const albumYear = document.querySelector('#albumYear').value
    // all artists of album
    let artists = []
    const artistInputs = document.querySelector('#artistList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < artistInputs.length; i++) {
        artists.push(artistInputs[i].value)
    }
    // all producers of album
    let producers = []
    const producerInputs = document.querySelector('#producerList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < producerInputs.length; i++) {
        producers.push(producerInputs[i].value)
    }
    // all labels of album
    let labels = []
    const labelInputs = document.querySelector('#labelList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < labelInputs.length; i++) {
        labels.push(labelInputs[i].value)
    }
    // all genres of album
    let genres = []
    const genreInputs = document.querySelector('#genreList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < genreInputs.length; i++) {
        genres.push(genreInputs[i].value)
    }
    // getting the length of the album
  const albumLength = document.querySelector('#albumLength').value

    // all tracks of album
    let tracks = []
    const trackNameInputs = document.querySelector('#albumTrackList').querySelectorAll('.trackTitleInput')
    const trackRuntimeInputs = document.querySelector('#albumTrackList').querySelectorAll('.trackRuntimeInput')
    for (let i = 0; i < trackNameInputs.length; i++) {
        const track = {
            name: trackNameInputs[i].value,
            length: trackRuntimeInputs[i].value
        }
        tracks.push(track)
    }

    const submissionDate = new Date()
    // new album, no ratings, no reviews
    const albumInfo = {
        name: albumTitle,
        cover: photoURL,
        artist: artists,
        producer: producers,
        year: albumYear,
        genre: genres,
        label: labels,
        length: albumLength,
        trackList: tracks,
        avgRating: 0,
        Reviews: []
    }
    const data = {
        title: albumTitle,
        cover: photoURL,
        artists: artists,
        time: new Date(),
        details: albumInfo
    }

    const url = '/pendingAlbumSubmissions';

    // -----------------
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    //TODO: fix error logging for second .then
    fetch(request)
    .then(function(res) {
            if (res.status === 200) {
                // If album was submitted successfully, tell the user.
                console.log('Album submitted')
            } else {
                console.log('Could not submit album')
            }
            return res.json()
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
    // ---------------------
  //  window.location.href = './albumSubmittedPage.html';
}

// code for fields of submission form
const addFieldButtons = document.getElementsByClassName("addInputButton");
const addTrackButton = document.getElementById("addTrackButton");
addTrackButton.addEventListener("click", addTrack);
let i;
for (i=0; i < addFieldButtons.length; i++){
    addFieldButtons[i].addEventListener("click", addField);
}

function addField(e) {
    e.preventDefault();
    const clickedButton = e.target;
    const parentList = clickedButton.parentElement;
    addFieldToElement(parentList);

}

function addFieldToElement(element) {
    const plusButton = element.getElementsByClassName("addInputButton")[0]; //There will always be exactly one per div
    const newField = document.createElement("input");
    newField.type = "text";
    newField.className = "albumInfoInput";
    const newContainer = document.createElement("li");
    newContainer.className = "inputContainer";
    newContainer.appendChild(newField);
    element.insertBefore(newContainer, plusButton);
    const minusButton = document.createElement("button");
    minusButton.type="button";
    minusButton.class="removeInputButton";
    const removeButtonText = document.createTextNode("-");
    minusButton.appendChild(removeButtonText);
    newContainer.appendChild(minusButton);
    minusButton.addEventListener("click", removeField);
}

function removeField(e) {
    e.preventDefault();
    const container = e.target.parentElement;
    const parentList = container.parentElement;
    parentList.removeChild(container);
}

/**
 * Adds a new track to the bottom of the track list
 */
function addTrack() {
    const albumTrackList = document.getElementById("albumTrackList");
    const newLi = document.createElement("li");
    newLi.className = "trackContainer";

    const titleContainer = document.createElement('div');
    titleContainer.className = "titleContainer";
    const titleLabel = document.createElement("label");
    const titleLabelText = document.createTextNode("Title: ");
    titleLabel.appendChild(titleLabelText);
    const titleInput = document.createElement("input")
    titleInput.type = "text";
    titleInput.className = "trackTitleInput";
    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    const trackRuntimeContainer = document.createElement('div');
    trackRuntimeContainer.className = "trackRuntimeContainer";
    const runtimeLabel = document.createElement("label");
    const runtimeLabelText = document.createTextNode("Running time:");
    runtimeLabel.appendChild(runtimeLabelText);
    const runtimeInput = document.createElement("input")
    runtimeInput.type = "text";
    runtimeInput.className = "trackRuntimeInput";
    trackRuntimeContainer.appendChild(runtimeLabel);
    trackRuntimeContainer.appendChild(runtimeInput);

    newLi.appendChild(titleContainer);
    newLi.appendChild(trackRuntimeContainer);

    const plusButton = document.getElementById("addTrackButton");
    albumTrackList.insertBefore(newLi, plusButton);

    const minusButton = document.createElement("button");
    minusButton.type="button";
    minusButton.class="removeTrackButton";
    const minusButtonText = document.createTextNode("-");
    minusButton.appendChild(minusButtonText);
    newLi.appendChild(minusButton);
    minusButton.addEventListener("click", removeField);
}
