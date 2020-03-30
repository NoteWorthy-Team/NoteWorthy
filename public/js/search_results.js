"use_strict";

const albums = []

class albumResult {
    constructor(albumId, albumName, albumCover, artist, year, link) {
      this.albumId = albumId;
      this.albumName = albumName;
      this.albumCover = albumCover;
      this.artist = artist ;
      this.year = year;
      this.link = link;
    }
}

// Isolating the search result string from the URL
const searchArray = window.location.search.split('=')

// Returns a parsed JSON of all the albums in the database.
function getAlbums() {
    // the URL for the request
    const url = '/albums';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get the albums')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        //const parsedAlbums = JSON.parse(json)
    
        // The actual string being queried
        const searchQuery = searchArray[searchArray.length - 1]
    
        const theseAlbums = json.albums.filter((album) => album.name.search(searchQuery) !== -1)
        console.log(theseAlbums)
    }).catch((error) => {
        console.log(error)
    })
}

/* function displayResults() {
    //const placement = document.querySelector('#results')
    const parsedAlbums = JSON.parse(getAlbums())
    console.log(parsedAlbums)
    // The actual string being queried
    const searchQuery = searchArray[searchArray.length - 1]
    const theseAlbums = parsedAlbums.filter((album) => album.title.search(searchQuery) !== -1)
    console.log(theseAlbums)
 */
/*     for (let i = 0; i < albums.length; i++) {
        if (albums[i].albumName.toLowerCase().search(searchQuery) !== -1) {
            const albumCoverLink = document.createElement('a')
            albumCoverLink.href = albums[i].link
            const albumInfoLink = document.createElement('a')
            albumInfoLink.href = albums[i].link
            const albumResult = document.createElement('div')
            albumResult.className = 'albumResult'
            const resultAlbumCover = document.createElement('img')
            resultAlbumCover.className = 'albumCover'
            resultAlbumCover.src = albums[i].albumCover
            const albumInfo = document.createElement('div')
            albumInfo.className = 'albumInfo'
            const resultArtistName = document.createElement('h2')
            resultArtistName.innerText = albums[i].artist
            const resultAlbumName = document.createElement('h2')
            resultAlbumName.innerText = albums[i].albumName
            const resultYear = document.createElement('h2')
            resultYear.innerText = albums[i].year
            albumInfo.appendChild(resultArtistName)
            albumInfo.appendChild(resultAlbumName)
            albumInfo.appendChild(resultYear)
            albumCoverLink.appendChild(resultAlbumCover)
            albumInfoLink.appendChild(albumInfo)
            albumResult.appendChild(albumCoverLink)
            albumResult.appendChild(albumInfoLink)
            placement.appendChild(albumResult)
        }
    } */
/* } */

getAlbums()
