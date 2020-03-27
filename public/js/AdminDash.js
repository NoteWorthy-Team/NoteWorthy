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

    const approveButtonCell = newRow.insertCell();
    const approveButton = document.createElement("button");
    approveButton.type="submit";
    const buttonText = document.createTextNode("Approve");
    approveButton.appendChild(buttonText);
    approveButton.addEventListener("click", function(e) {approveAlbum(album.albumId)});
    approveButtonCell.appendChild(approveButton);
    //const detailsLinkCell = newRow.insertCell();
    //const detailsLink = document.createElement("a");
    //detailsLink.href = "./admin-album-editor" + album.albumId + ".html";
    //const detailsText = document.createTextNode("+");
    //detailsLink.appendChild(detailsText);
    //detailsLinkCell.appendChild(detailsLink);
    
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



document.onload = displayAlbumSubmissions();
