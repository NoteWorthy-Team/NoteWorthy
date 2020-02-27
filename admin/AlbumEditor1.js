//AlbumEditor.js

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

function populateForm() {
    const submitterNameLink = document.getElementById("submitterName");
    const submissionDateSpan = document.getElementById("submissionDate");
    album = getAlbumData();
    const submitterNameText = document.createTextNode(album.submitter.name);
    submitterNameLink.appendChild(submitterNameText);
    const submissionDateText = document.createTextNode(album.submissionDate);
    submissionDateSpan.appendChild(submissionDateText);
    populateTitleField(album);
    populateYearField(album);
    populateArtistList(album);
    populateProducerList(album);
    populateLabelList(album);
    populateGenreList(album);
    populateTrackList(album);
}
function populateTitleField(album) {
    titleField = document.getElementById("albumTitle");
    titleField.value = album.title;
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
    const titleLabelText = document.createTextNode("Title:");
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
    for (i = 0; i < album.tracklisting.length; i++){
        const titleInput = nextLi.getElementsByClassName("trackTitleInput")[0];
        const runtimeInput = nextLi.getElementsByClassName("trackRuntimeInput")[0];
        const track = album.tracklisting[i]
        titleInput.value = track.name;
        runtimeInput.value = track.runtime;
        if (i + 1 < album.tracklisting.length) {
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
    return album2;
}
window.onbeforeunload = function(){
    /// Warn the user data might not be saved before closing the page.
    return true;
};

//---------------------------------------------------
//Sample data for the album editor in lieue of 
//pulling this information from a database.

//Simple track class
//The fields here are only what the album editor
//requires.
class Track {
    constructor(name, runtime){
        this.name = name;
        this.runtime = runtime;
    }
}
//Simple user class, as above; 
class User {
    constructor (userid, name) {
        this.userid = userid;
        this.name = name;
    }
}

let albumCount = 0;
class Album {
    constructor(title, artist, producer, year, genre, label, runtime, tracklisting, submitter) {
        this.albumId = albumCount;
        albumCount++;
        this.title=title;
        this.artist=artist;
        this.producer=producer;
        this.year=year;
        this.genre=genre;
        this.label=label;
        this.runtime=runtime;
        this.tracklisting=tracklisting;
        this.avgRating=null;
        this.submitter = submitter;
        this.submissionDate = new Date();
    }
}
const trackListing1 = [
    new Track("Intro", "3:09"),
    new Track("Markadelic", "2:36"),
    new Track("Remark Request", "2:53")];
const trackListing2 = [
    new Track("Here Comes the Hammer", "4:32"),
    new Track("U Can't Touch This", "4:17"),
    new Track("Have You Seen Her", "4:42")];
const sampleUser1 = new User(1, "Sample User 1");
const sampleUser2 = new User(2, "Sample User 2");
const album1 = new Album("Bahen...", "NoteWorthy", "NoteWorthy", "2020", "Rock", "MarkUs Records", "29:34", trackListing1, sampleUser1);
const album2 = new Album("Please Hammer Don't Hurt 'Em", ["MC Hammer"], ["Big Louis Burrel", "MC Hammer", "Scott Folks"], "1990", ["Hip hop"], ["Capitol Records"], "59:04", trackListing2, sampleUser2);
const sampleSubmissions = [album1, album2];
//---------------------------------------------------

document.onload = populateForm();