//AlbumEditor.js

const addFieldButtons = document.getElementsByClassName("addInputButton");


let i;
for (i=0; i < addFieldButtons.length; i++){
    addFieldButtons[i].addEventListener("click", addField);
}

function addField(e) {
    e.preventDefault();
    const clickedButton = e.target;
    const parentList = clickedButton.parentElement;

    const newTextInput = document.createElement("input");
    newTextInput.type = "text";
    newTextInput.className = "albumInfoInput";
    const newContainer = document.createElement("div");
    newContainer.className = "inputContainer";
    newContainer.appendChild(newTextInput);
    parentList.insertBefore(newContainer, clickedButton);
    const removeButton = document.createElement("button");
    removeButton.type="button";
    removeButton.class="removeInputButton";
    const removeButtonText = document.createTextNode("-");
    removeButton.appendChild(removeButtonText);
    newContainer.appendChild(removeButton);
    removeButton.addEventListener("click", removeField);
}

function removeField(e) {
    e.preventDefault();
    const container = e.target.parentElement;
    const parentList = container.parentElement;
    parentList.removeChild(container);
}