let collection = null

const collectionTitle = document.getElementById("collection_title");
const collectionDiv = document.getElementById("collection");

// Runs certain functions once the page is loaded
window.onload = function() {
  // the URL for the request
  const url = '/viewable_Collectioninfo';

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json()
    } else {
      console.log('Could not get user info')
    }
  })
  .then((json) => {  // the resolved promise with the JSON body
    collection = json.collection
      displayCollection()
  }).catch((error) => {
    console.log(error)
  })
}

function   displayCollection() {

  const collectionHead = document.createElement('h1')
  collectionHead.appendChild(document.createTextNode(collection.collectionName))
  collectionTitle.appendChild(collectionHead)

  for( let i =0; i <collection.albums.length; i++ )
  {
      const currentAlbum = collection.albums[i]
      const albumDiv = document.createElement('div')
      const albumInfoDiv = document.createElement('div')
      const albumImg =  document.createElement('img')
      const albumhead =  document.createElement('h2')

      albumDiv._id = currentAlbum._id
      albumInfoDiv._id = currentAlbum._id
      albumImg._id = currentAlbum._id
      albumhead._id = currentAlbum._id

      albumDiv.className = 'album'
      albumInfoDiv.className = 'albumInfo'
      albumImg.className = 'albumCover'
      albumImg.src = currentAlbum.cover

      albumhead.appendChild(document.createTextNode(currentAlbum.name))
      albumInfoDiv.appendChild(albumhead)

      albumDiv.appendChild(albumImg)
      albumDiv.appendChild(albumInfoDiv)
      albumDiv.addEventListener('click', toAlbumPage)
      collectionDiv.appendChild(albumDiv)
  }
}

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
