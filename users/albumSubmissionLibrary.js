// code for submit button
const submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", handleFormSubmit)

function handleFormSubmit (e) {
    e.preventDefault();
    window.location.href = './albumSubmittedPage.html';
}


// code for fields of submission form
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
    const plusButton = element.getElementsByClassName("addInputButton")[0]; //There will always be exactly one per div
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

/**
 * Adds a new track to the bottom of the track list
 */
function addTrack() {
    const albumTrackList = document.getElementById("albumTrackList");
    const newLi = document.createElement("li");
    newLi.className = "trackContainer";

    const titleContainer = document.createElement('div');
    titleContainer.className = "titleContainer";
    const titleLabel = document.createElement("label");
    const titleLabelText = document.createTextNode("Title: ");
    titleLabel.appendChild(titleLabelText);
    const titleInput = document.createElement("input")
    titleInput.type = "text";
    titleInput.className = "trackTitleInput";
    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    const trackRuntimeContainer = document.createElement('div');
    trackRuntimeContainer.className = "trackRuntimeContainer";
    const runtimeLabel = document.createElement("label");
    const runtimeLabelText = document.createTextNode("Running time:");
    runtimeLabel.appendChild(runtimeLabelText);
    const runtimeInput = document.createElement("input")
    runtimeInput.type = "text";
    runtimeInput.className = "trackRuntimeInput";
    trackRuntimeContainer.appendChild(runtimeLabel);
    trackRuntimeContainer.appendChild(runtimeInput);

    newLi.appendChild(titleContainer);
    newLi.appendChild(trackRuntimeContainer);
    
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
