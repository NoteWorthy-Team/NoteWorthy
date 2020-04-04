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

    for (let i=0; i < album.artists.length; i++){
      const artistText = document.createTextNode(album.artists[i]);
      artistCell.appendChild(artistText);
    }

    // TODO: need to fix these links
    const submitterCell = newRow.insertCell();
    const submitDiv = document.createElement("div");
    submitDiv._id = album.user
    const submitterText = document.createTextNode(album.user);
    submitDiv.appendChild(submitterText);
    submitDiv.addEventListener('click', toToUserPage)
    submitterCell.appendChild(submitDiv);

    const submissionDateCell = newRow.insertCell();
    const submissionDateText = document.createTextNode(album.submissionDate);
    submissionDateCell.appendChild(submissionDateText);
    
    const detailsLinkCell = newRow.insertCell();
    const detailsLink = document.createElement("a");
    detailsLink.href = '/editSubmission&album=' + album.albumId; 
    //detailsLink.albumId = album.albumId;
    //detailsLink.addEventListener('click', toSubmissionEditor);
    const detailsText = document.createTextNode("View Details");
    detailsLink.appendChild(detailsText);
    detailsLinkCell.appendChild(detailsLink);
}

function approveAlbum(albumId) {

    const url = '/album/:' + albumId;
    const request = new Request(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
            if (res.status === 200) {
                console.log('Approved album: ', albumId)
            } else {
                console.log('Could not approve album: ', albumId)
            }
            return res.json()
        })
        .catch((error) => {
          console.log(error)
        })
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
      const pendingAlbums = json;
      populateSubmissionsTable(pendingAlbums);
    }).catch((error) => {
      console.log(error)
    })

}

document.onload = displayAlbumSubmissions();

function toToUserPage(e) {
  console.log("Clicked on div")
  const url = '/viewUser';

  const data = {
    userID: e.toElement._id
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
      window.location = URL+ 'dashboard_viewable'
    }
  }).catch((error) => {
    console.log(error)
  })
}
