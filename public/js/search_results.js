"use_strict";

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
        // The actual string being queried
        const placement = document.querySelector('#results')

        const searchQuery = searchArray[searchArray.length - 1].toLowerCase()

        const theseAlbums = json.albums.filter((album) => album.name.toLowerCase().search(searchQuery) !== -1)

        for (let i = 0; i < theseAlbums.length; i++) {

            // Greater album div
            const albumResult = document.createElement('div')
            albumResult.className = 'albumResult'
            albumResult._id = theseAlbums[i]._id

            // The album cover
            const resultAlbumCover = document.createElement('img')
            resultAlbumCover.className = 'albumCover'
            resultAlbumCover.src = theseAlbums[i].cover
            resultAlbumCover._id = theseAlbums[i]._id

            // Text info of the album
            const albumInfo = document.createElement('div')
            albumInfo.className = 'albumInfo'
            albumInfo._id = theseAlbums[i]._id

            // Artist(s) name, it is inside an array
            const resultArtistName = document.createElement('h2')
            resultArtistName.innerText = theseAlbums[i].artist
            resultArtistName._id = theseAlbums[i]._id

            // Album name
            const resultAlbumName = document.createElement('h2')
            resultAlbumName.innerText = theseAlbums[i].name
            resultAlbumName._id = theseAlbums[i]._id

            // Album year
            const resultYear = document.createElement('h2')
            resultYear.innerText = theseAlbums[i].year
            resultYear._id = theseAlbums[i]._id

            // Place all text info into the same div
            albumInfo.appendChild(resultArtistName)
            albumInfo.appendChild(resultAlbumName)
            albumInfo.appendChild(resultYear)


            // Place cover and text links into a single result box
            albumResult.appendChild(resultAlbumCover)
            albumResult.appendChild(albumInfo)

            albumResult.addEventListener('click', toAlbumPage)

            // Place into overall page
            placement.appendChild(albumResult)
        }
    }).catch((error) => {
        console.log(error)
    })
}

getAlbums()

function toAlbumPage(e) {
    console.log("Clicked on div")
    const url = '/viewAlbum';

    const data = {
      albumID: e.toElement._id
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
        window.location = URL+ 'album'
      }
    }).catch((error) => {
      console.log(error)
    })
  }
