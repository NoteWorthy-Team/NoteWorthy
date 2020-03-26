// code for submit button
const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", handleFormSubmit)

function handleFormSubmit(e) {
    e.preventDefault();
    const albumTitle = document.querySelector('#albumTitle').value
    const albumYear = document.querySelector('#albumYear').value    
    // all artists of album
    var artists = []
    const artistInputs = document.querySelector('#artistList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < artistInputs.length; i++) {
        artists.push(artistInputs[i].value)
    }
    // all producers of album
    var producers = []
    const producerInputs = document.querySelector('#producerList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < producerInputs.length; i++) {
        producers.push(producerInputs[i].value)
    }
    // all labels of album
    var labels = []
    const labelInputs = document.querySelector('#labelList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < labelInputs.length; i++) {
        labels.push(labelInputs[i].value)
    }
    // all genres of album
    var genres = []
    const genreInputs = document.querySelector('#genreList').querySelectorAll('.albumInfoInput')
    for (let i = 0; i < genreInputs.length; i++) {
        genres.push(genreInputs[i].value)
    }
    // all tracks of album
    var tracks = []
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
    // TODO: length left blank for now. should we remove this field?
    // new album, no ratings, no reviews
    // TODO: using id of user "user" for now, should get objectid of current user
    const albumInfo = {
        name: albumTitle,
        artist: artists,
        producer: producers,
        year: albumYear,
        genre: genres,
        label: labels,
        length: null,
        trackList: tracks,
        avgRating: 0,
        Reviews: []
    }
    const data = {
        title: albumTitle,
        artists: artists,
        user: "5e7b9a9a77d8630017b55ee7",
        time: "just now",
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
    window.location.href = './albumSubmittedPage.html';
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
