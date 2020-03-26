//AdminDash.js


const dashboard = document.querySelector("#adminDashboard")
const submissionTable = document.querySelector("#pendingAlbumSubmissionsTable");
const userTicketsTable = document.createElement("table");

function populateTicketsTable() {
    throw "Not implemented";
}

function displayUserTickets() {
    dashboard.removeChild(submissionTable);
    dashboard.appendChild(userTicketsTable);
    populateTicketsTable();
}

function displayAlbumSubmissions() {
    if (false) { //Later, will be checking which table is currently displayed
        dashboard.removeChild(userTicketsTable);
    }
    dashboard.appendChild(submissionTable);

    getAlbumSubmissions();
}
function populateSubmissionsTable(pendingSubmissions) {
    const table = submissionTable;
    let i;
    for (i = 0; i < pendingSubmissions.length; i++) {
        const album = pendingSubmissions[i];
        addAlbumToTable(album, table);
    }
}

function addAlbumToTable(album, table) {
    const newRow = table.insertRow();

    const idCell = newRow.insertCell();
    const idText = document.createTextNode(album.albumId);
    idCell.appendChild(idText);

    const titleCell = newRow.insertCell();
    const titleText = document.createTextNode(album.title);
    titleCell.appendChild(titleText);

    const artistCell = newRow.insertCell();
    if (album.artists) {
        for (let i=0; i < album.artists.length; i++){
            const artistText = document.createTextNode(album.artists[i]);
            artistCell.appendChild(artistText);
        }  
    }


    const submitterCell = newRow.insertCell();
    const submitterLink = document.createElement("a");
    submitterLink.href='./user_viewable_' + album.submitter.userid +'.html'
    const submitterText = document.createTextNode(album.submitter.name);
    submitterLink.appendChild(submitterText);
    submitterCell.appendChild(submitterLink);

    const submissionDateCell = newRow.insertCell();
    const submissionDateText = document.createTextNode(album.submissionDate);
    submissionDateCell.appendChild(submissionDateText);

    const detailsLinkCell = newRow.insertCell();
    const detailsLink = document.createElement("a");
    detailsLink.href = "./admin-album-editor" + album.albumId + ".html";
    const detailsText = document.createTextNode("+");
    detailsLink.appendChild(detailsText);
    detailsLinkCell.appendChild(detailsLink);

}
function getAlbumSubmissions() {
    /// Get pending album submissions from server
    // code below requires server call
    // Since this is a GET request, simply call fetch on the URL
    const url = '/pendingAlbumSubmissions';
    fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        console.log('Got pending album info')
        return res.json()
      } else {
        console.log('Could not get pending album info')
      }
    })
    .then((json) => {  // the resolved promise with the JSON body
      console.log(json)
      //currentUser = json.user
      const pendingAlbums = json;
      populateSubmissionsTable(pendingAlbums);
    }).catch((error) => {
      console.log(error)
    })
    
}

//---------------------------------------------------
//Sample data for the admin dashboard in lieue of
//pulling this information from a database.

//Simple track class
//The fields here are only what the admin dashboard
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
const sampleUser1 = new User(1, "csc309");
const sampleUser2 = new User(2, "emptyuser");
const album1 = new Album("Bahen...", ["NoteWorthy"], ["NoteWorthy"], "2020", ["Rock"], ["MarkUs Records"], "29:34", trackListing1, sampleUser1);
const album2 = new Album("Please Hammer Don't Hurt 'Em", ["MC Hammer"], ["Big Louis Burrel", "MC Hammer", "Scott Folks"], "1990", ["Hip hop"], ["Capitol Records"], "59:04", trackListing2, sampleUser2);
const sampleSubmissions = [album1, album2];
//---------------------------------------------------

document.onload = displayAlbumSubmissions();
