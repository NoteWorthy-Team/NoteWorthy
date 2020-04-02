//AlbumEditor.js

//TODO: Show submitted album's cover and let the admin change it

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
    const submitterNameLink = document.getElementById("submitterName");
    const submissionDateSpan = document.getElementById("submissionDate");
    const submitterNameText = document.createTextNode(album.user.displayName);
    submitterNameLink.appendChild(submitterNameText);
    submitterNameLink.href='#'; //TODO: make this link work
    const submissionDateText = document.createTextNode(album.time);
    submissionDateSpan.appendChild(submissionDateText);
    const albumDetails = album.details;
    populateTitleField(albumDetails);
    populateYearField(albumDetails);
    populateArtistList(albumDetails);
    populateProducerList(albumDetails);
    populateLabelList(albumDetails);
    populateGenreList(albumDetails);
    populateTrackList(albumDetails);
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
        console.log('Got pending album details')
        return res.json()
      } else {
        console.log('Could not get pending album info')
      }
    })
    .then((json) => {  // the resolved promise with the JSON body
      console.log(json)
      const albumDetails = json;
      populateForm(albumDetails);
    }).catch((error) => {
      console.log(error)
    })
}

window.onbeforeunload = function(){
    /// Warn the user data might not be saved before closing the page.
    return true;
};

document.onload = getAlbumData();