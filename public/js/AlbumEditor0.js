//AlbumEditor.js

let photoURL = "";
const newAlbumCover = document.getElementsByClassName("newPhotoForm")[0];
newAlbumCover.addEventListener('submit', getPhotoUrl);
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
        return res.json()
      } else {
        // If server couldn't add the image, tell the user.
        // Here we are adding a generic message, but you could be more specific in your app.
      }
    })
    .then((json) => {  // the resolved promise with the JSON body
      photoURL = json.url;
      showCoverImage(photoURL);
    }).catch((error) => {
      console.log(error)
    })
  }

let dataNotSaved = true;
window.onbeforeunload = function(){
    /// Warn the user data might not be saved before closing the page.
    return dataNotSaved;
};

const form = document.getElementById("albumForm");
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
    const plusButton = element.getElementsByClassName("addInputButton")[0]; //There always be exactly one per div
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

function populateForm(album) {
    
    form.albumId = album._id;
    const saveButton = document.getElementById("saveButton");
    const approveButton = document.getElementById("approveButton");
    saveButton.addEventListener('click', patchAlbum);
    approveButton.addEventListener('click', postAlbum);

    
    const submitterNameLink = document.getElementById("submitterName");
    const submissionDateSpan = document.getElementById("submissionDate");
    const submitterNameText = document.createTextNode(album.user.displayName);
    submitterNameLink.appendChild(submitterNameText);
    submitterNameLink.href='#'; //TODO: make this link work
    const submissionDateText = document.createTextNode(album.time);
    submissionDateSpan.appendChild(submissionDateText);
    const albumDetails = album.details;
    photoURL = albumDetails.cover;

    showCoverImage(photoURL);
    populateTitleField(albumDetails);
    populateYearField(albumDetails);
    populateArtistList(albumDetails);
    populateProducerList(albumDetails);
    populateLabelList(albumDetails);
    populateGenreList(albumDetails);
    populateTrackList(albumDetails);
}

function showCoverImage(source) {
    const coverImg = document.getElementById("albumCover");
    coverImg.src = source;
}
function populateTitleField(album) {
    titleField = document.getElementById("albumTitle");
    titleField.value = album.name;
}
function populateYearField(album) {
    yearField = document.getElementById("albumYear");
    yearField.value = album.year;
}

function populateArtistList(album) {
    const artistList = document.getElementById("artistList");
    populateListElement(artistList, album.artist);
    
}

function populateProducerList(album) {
    const producerList = document.getElementById("producerList");
    populateListElement(producerList, album.producer);
}

function populateLabelList(album) {
    const labelList = document.getElementById("labelList");
    populateListElement(labelList, album.label);
}
function populateGenreList(album) {
    const genreList = document.getElementById("genreList");
    populateListElement(genreList, album.genre);
}
/**
 * Adds a new track to the bottom of the track list
 */
function addTrack() {
    const albumTrackList = document.getElementById("albumTrackList");
    const newLi = document.createElement("li");
    newLi.className = "trackContainer";
    const titleLabel = document.createElement("label");
    const titleLabelText = document.createTextNode("Title: ");
    titleLabel.appendChild(titleLabelText);
    const titleInput = document.createElement("input")
    titleInput.type = "text";
    titleInput.className = "trackTitleInput";
    const runtimeLabel = document.createElement("label");
    const runtimeLabelText = document.createTextNode("Running time:");
    runtimeLabel.appendChild(runtimeLabelText);
    const runtimeInput = document.createElement("input")
    runtimeInput.type = "text";
    runtimeInput.className = "trackRuntimeInput";
    newLi.appendChild(titleLabel);
    newLi.appendChild(titleInput);
    newLi.appendChild(runtimeLabel);
    newLi.appendChild(runtimeInput);
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
function populateTrackList(album) {
    const albumTrackList = document.getElementById("albumTrackList");
    let i;
    let nextLi = albumTrackList.firstElementChild;
    for (i = 0; i < album.trackList.length; i++){
        const titleInput = nextLi.getElementsByClassName("trackTitleInput")[0];
        const runtimeInput = nextLi.getElementsByClassName("trackRuntimeInput")[0];
        const track = album.trackList[i]
        titleInput.value = track.name;
        runtimeInput.value = track.length;
        if (i + 1 < album.trackList.length) {
            addTrack();
            nextLi = nextLi.nextElementSibling;
        }
    }
}

function populateListElement(element, data) {
    if (Array.isArray(data)) {
        populateListElementFromArray(element, data);
    } else {
        const li = element.firstElementChild;
        const input = li.getElementsByTagName("input")[0];
        input.value = data;
    }
}
/**
 * Fills in an expanding list element with data from an array.
 * Creates one input field from each array item using the item's
 * toString method.
 * @param {*} element
 * @param {array of object} data 
 */
function populateListElementFromArray(element, data) {
    let i;
    let nextLi = element.firstElementChild;
    for (i = 0; i < data.length; i++){
        const input = nextLi.getElementsByTagName("input")[0];
        input.value = data[i];
        if (i + 1 < data.length) {
            addFieldToElement(element);
            nextLi = nextLi.nextElementSibling;
        }
    }
}

function getAlbumData() {
    /// Gets album data from server
    // code below requires server call
    const url = '/submissionDetails';
    fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json()
      } else {
        console.log('Could not get pending album info')
      }
    })
    .then((json) => {  // the resolved promise with the JSON body
      const albumDetails = json;
      populateForm(albumDetails);
    }).catch((error) => {
      console.log(error)
    })
}

// Creates a track from the data in the container
function getTrack (container) {
    const nameInput = container.getElementsByClassName("trackTitleInput")[0];
    const lengthInput = container.getElementsByClassName("trackRuntimeInput")[0];
    return {
        name: nameInput.value,
        length: lengthInput.value
    }
}
// Creates an array of TrackSchema from the form's track list
function getTrackListData () {
    const trackContainers = document.getElementsByClassName("trackContainer");
    const tracks = [];
    for (let i = 0; i < trackContainers.length; i++) {
        container = trackContainers[i];
        tracks.push(getTrack(container));
    }
    return tracks;
}

function getArrayFromListElement(ul) {
    const data = [];
    const children = ul.children
    for (let i=0; i< children.length; i++) {
        const listChild = children[i];
        if (listChild.tagName == 'LI') {
            input = listChild.firstElementChild;
            data.push(input.value);
        }
    }
    return data;
}

// Creates an Album from the data currently in the form
function getFormData () {
    const nameField = document.getElementById("albumTitle");
    const yearField = document.getElementById("albumYear");
    const artistList = document.getElementById("artistList");
    const producerList = document.getElementById("producerList");
    const genreList = document.getElementById("genreList");
    const labelList = document.getElementById("labelList");
    album = {
        name: nameField.value,
        cover: photoURL,
        year: yearField.value,
        artist: getArrayFromListElement(artistList),
        producer: getArrayFromListElement(producerList),
        genre: getArrayFromListElement(genreList),
        label: getArrayFromListElement(labelList),
        trackList: getTrackListData()
    }
    return album;
}

function patchAlbum(e) {
    e.preventDefault();
    const url = '/pendingAlbumSubmissions/' + form.albumId;
    const body = JSON.stringify(getFormData());
    const request = new Request(url, {
        method: 'PATCH',
        body: body,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request)
    .then((res) => {
        if (res.status === 200) {
            dataNotSaved = false;
            window.location = URL + 'admin';
        }
    }).catch((error) => {
        console.log(error)
    })
}

function postAlbum(e) {
    e.preventDefault();
    const url = '/album/' + form.albumId;
    const body = JSON.stringify(getFormData());
    const request = new Request(url, {
        method: 'post',
        body: body,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request)
    .then((res) => {
        if (res.status === 200) {
            dataNotSaved = false;
            window.location = URL + 'admin';
        }
    }).catch((error) => {
        console.log(error)
    })
}



document.onload = getAlbumData();