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

const hammer = new albumResult(0, "Please Hammer Don't Hurt 'Em", './img/please_hammer_dont_hurt_em.jpg',
    'MC Hammer', '1990', 'albums/album_0.html')
const bahen = new albumResult(1, 'Bahen...', './img//bahen....jpg',
    'NoteWorthy', '2020', 'albums/album_1.html')
const help = new albumResult(2, 'Help!', './img//help.jpg',
    'The Beatles', '1965', 'albums/album_2.html')

albums.push(hammer)
albums.push(bahen)
albums.push(help)

// Isolating the search result string from the URL
const searchArray = window.location.search.split('=')

function displayResults() {

    const placement = document.querySelector('#results')
    const searchQuery = searchArray[searchArray.length - 1]

    for (let i = 0; i < albums.length; i++) {
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
    }
}

displayResults()
