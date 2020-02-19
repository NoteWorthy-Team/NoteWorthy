//AdminDash.js
import {sampleSubmissions as pendingSubmissions} from ".//sampleSubmissions.js";

const submissionTable = document.querySelector(".pendingAlbumSubmissionsTable");
function populateSubmissionsTable() {
    const tbody = submissionTable.firstElementChild;
    let i;
    for (i = 0; i < pendingSubmissions.length; i++) {
        const album = pendingSubmissions[i];
        addAlbumToTable(album, tbody);
    }
}

function addAlbumToTable(album, tableBody) {
    const newRow = document.createElement("tr");

    const idCell = document.createElement("td");
    const idText = document.createTextNode(album.albumId);
    idCell.appendChild(idText);
    newRow.appendChild(idCell);

    const titleCell = document.createElement("td");
    const titleText = document.createTextNode(album.title);
    titleCell.appendChild(titleText);
    newRow.appendChild(titleCell);

    const artistCell = document.createElement("td");
    const artistText = document.createTextNode(album.artist);
    artistCell.appendChild(artistText);
    newRow.appendChild(artistCell);

    const submitterCell = document.createElement("td");
    const submitterText = document.createTextNode(album.submitter.name);
    submitterCell.appendChild(submitterText);
    newRow.appendChild(submitterCell);

    const submissionDateCell = document.createElement("td");
    const submissionDateText = document.createTextNode(album.submissionDate);
    submissionDateCell.appendChild(submissionDateText);
    newRow.appendChild(submissionDateCell);

    const detailsLinkCell = document.createElement("td");
    const detailsLink = document.createElement("a");
    detailsLink.href = "./submissions/album?id=" + album.albumId;
    const detailsText = document.createTextNode("+");
    detailsLink.appendChild(detailsText);
    detailsLinkCell.appendChild(detailsLink);
    newRow.appendChild(detailsLinkCell);

    tableBody.appendChild(newRow);
}

function displaySubmissionDetails() {

}

document.onload = populateSubmissionsTable();