const followButton = document.getElementById("followButton")
followButton.addEventListener("click", handleFollowButtonClick)

function handleFollowButtonClick() {
    if (followButton.innerHTML == 'Follow') {
        followButton.innerHTML = 'Unfollow'
    } else {
        followButton.innerHTML = 'Follow'
    }
    
}