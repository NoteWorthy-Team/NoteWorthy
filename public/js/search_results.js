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
            
            // Album cover link
            const albumCoverLink = document.createElement('a')
            // albumCoverLink.href = albums[i].link
            
            // Album info link
            const albumInfoLink = document.createElement('a')
            // albumInfoLink.href = albums[i].link
            
            // Greater album div
            const albumResult = document.createElement('div')
            albumResult.className = 'albumResult'

            // The album cover
            const resultAlbumCover = document.createElement('img')
            resultAlbumCover.className = 'albumCover'
            resultAlbumCover.src = theseAlbums[i].cover

            // Text info of the album
            const albumInfo = document.createElement('div')
            albumInfo.className = 'albumInfo'

            // Artist(s) name, it is inside an array
            const resultArtistName = document.createElement('h2')
            resultArtistName.innerText = theseAlbums[i].artist

            // Album name
            const resultAlbumName = document.createElement('h2')
            resultAlbumName.innerText = theseAlbums[i].name
            
            // Album year
            const resultYear = document.createElement('h2')
            resultYear.innerText = theseAlbums[i].year

            // Place all text info into the same div
            albumInfo.appendChild(resultArtistName)
            albumInfo.appendChild(resultAlbumName)
            albumInfo.appendChild(resultYear)
            
            // Place cover and text info into a link
            albumCoverLink.appendChild(resultAlbumCover)
            albumInfoLink.appendChild(albumInfo)
            
            // Place cover and text links into a single result box
            albumResult.appendChild(albumCoverLink)
            albumResult.appendChild(albumInfoLink)
            
            // Place into overall page
            placement.appendChild(albumResult)
        }
    }).catch((error) => {
        console.log(error)
    })
}

getAlbums()
