# NoteWorthy

## Description
NoteWorthy is a web application that provides a platform for music listeners to log, curate, rate, and review albums that they have listened to. Moreover, listeners are able to connect and share their favourite albums with others on the site. NoteWorthy is also a music encyclopedia, with all the information you need on your favourite albums or albums you have just discovered!

## Key Features
Some key features for NoteWorthy are for users to log the albums they have listened to, log a list of albums for future listening, rate and write reviews for listened albums, and curate collections of albums that they feel have some sort of bearing with each other. All these things will be kept track of for each user and will be displayed on their individual pages. 

Users are able to connect with each other by following each other. In this way, users may discover new people and albums through keeping track of what other users listen to.

Album pages display general information on the album. More importantly, album pages display the average user rating and reviews for said album. 

Key to NoteWorthy is that the albums and album information are crowd-sourced. If NoteWorthy does not have the album a user is looking to log or review, then they will be able to submit a request to add that album onto the application. Each request will be reviewed by our admin team to ensure that the information is reliable and accurate. 

To see whether we here at NoteWorthy have an album or not, users of course can use the search bar on the navigation bar on the top of the page.

## User Instructions
To begin using the regular user portion of NoteWorthy, access the app through the URL https://lit-dawn-95381.herokuapp.com/. You will be greeted with a login screen. For the login credentials please use: 

__user:__ user

__password:__ user

Once you login you will be greeted with the user page associated with that account--in this case our friend tonybaloney. On the left hand side of this page you will find a user's name, profile picture, biography, and a list of the users they are following. You can see  a full friend list by clicking "See full friend list". Clicking on a user's profile picture in this section brings you to their profile. On user pages that are not your own there is a "follow" or "unfollow" button on the top right of their page. In the central part of the page you will find a user's favourite albums under the "Top Albums" heading. Under that you will find a space with three seperate tabs. Clicking the "Reviews" tab will display the latest reviews that that user has written. Clicking the "Collections" tab shows what list of albums that user has created (by default every user has a "Listened" collection). You can further explore the these collections by clicking them. Finally, the "To Listen" tab displays the albums the user has chosen to queue up on their listening list. Clicking the album art in the "Top Albums", "Reviews", or "To Listen" page will bring you to this section brings you to that album's page. 

Another way for searching for albums is to use the search field in the navigation bar. Currently there are three albums in the database to be searched for: MC Hammer's "Please Hammer Don't Hurt 'Em", The Beatles' "Help!", and NoteWorthy's in-house album "Bahen...". The search will bring the user a results page. Once on an album page you will find basic information on the album as well as album art and tracklist. Moreover, on the central portion of the page, there are the most recent reviews that users have written. The average rating for the album is displayed on the bottom left of the page. There is also a text box under the recent reviews that allows users to write their own reviews and rate the album. Found under the album art are options for adding/removing items from your "Top Albums", "Listened to", and "To Listen" lists. 

If there is an album that a user would like to see added to the database, the "Submit Album" link is located on the top right of the navigation bar. Once on this page, the user will be asked to fill out a form with all the information required for an album to be displayed on NoteWorthy. A user must submit an album art cover for a submission to go through. When the submission is completed a NoteWorthy admin will review and confirm that the album information is correct and add it into the database.

Other than the search bar and the "Submit Album" link, the navigation bar also contains a link back to the profile of currently logged in user.

With all of that you now have all the skills to navigate the phase 2 user portion of NoteWorthy!

## New User Instructions
To create a new user on NoteWorthy, access the app through URL https://lit-dawn-95381.herokuapp.com/. You will be presented with a login screen. Click the "New User" button on the top left hand corner of the page. You will be brought to a form that requires all the information needed for a new user such as a profile picture, username, password, and a short biography. Once you've finished your registration by clicking the "Register" button, you can click the "Home" button the navigation bar to head to the login screen once again. Now with the information you just used to register you can login to NoteWorthy and begin your musical journey!

## Admin Instructions
To begin using the admin portion of NoteWorthy, access the app through the URL https://lit-dawn-95381.herokuapp.com/. You will be greeted with a login screen. For the login credentials please use: 

__user:__ admin

__password:__ admin

When logged in the Adminstrator Dashboard will be displayed. Here an admin can find the list of albums requesting to be added into the database under the "Pending Submssions" link. Each album is given an unique ID and shows which user has submitted the album and when. Clicking on the details of the album the admin is able to edit the information of an album such as the title, artist, and tracklist. Once an admin confirms the information they can hit the "Save and Approve" button to display it onto NoteWorthy, if they feel like they want to further confirm information they may just hit the "Save" button and finish working on the request later. Also available on the dashboard is the "User Ticket" link, which displays changes that a user may want to do to their profiles such a user deletion. As with the user version of the site, there is a navigation bar on the top of the page that allows you to navigate NoteWorthy with the regular user experience. For more information on the regular user experience please refer to the "User Instructions" portion of this README.

With all of that you now have all the skills to navigate the phase 2 admin portion of NoteWorthy!

## Technical Overview of Middleware & Routes
### Session Handling
#### sessionChecker
Express middleware to check for an active user on the session's cookies. More specifically, it is used to check if a user is logged in. If a user is logged in, it will redirect to the dashboard. Otherwise, it will continue the login process.

#### isSessionDead
Express middleware to check for an active user on the session's cookies. It is used when an URL to a page is received and requires a user to be signed in to use correctly. If no user is signed in, it will redirect to the log in page. Otherwise, it will continue to the received GET request.

### Webpage Routes
#### GET '/'
The default call on the URL. Redirects to the index page.

#### GET 'index'
The main page of the NoteWorthy site. Allows visitors to login or to make a new user. Sends back the index.html file.

#### GET 'newuser'
The page in which a user can create an account. Sends back the newuser.html file.

#### GET 'dashboard'
The current logged in user's profile page. Resets the other session's variables and sends back the dashboard.html file.

#### GET 'dashboard_viewable'
The dashboard of another user that the current user has clicked on. Requires a user to be logged in. Sends back the userviewable.html file.

#### GET 'friendlist'
The current logged in user's friend list page. Sends back the user_friend_list.html file.

#### GET 'viewable_friendlist'
Views the friend list of another NoteWorthy user that the user has clicked on. Requires a user to be logged in. Sends back the userviewable_friend_list.html file.

#### GET 'collection'
Shows a user's collection that they have clicked on. Sends back the user_collection.html file.

#### GET 'userviewable_collection'
Views the collection of another NoteWorthy user that the user has clicked on. Requires a user to be logged in.Sends back the userviewable_collection.html file.

#### GET 'submitalbum'
Allows the user to submit an album. Requires a user to be logged in. Sends back the albumSubmissionPage.html file.

#### GET 'album'
Views the album page that a user has visited. Requires a user to be logged in. Sends back the album.html file.

#### GET 'searchResult'
Views the search results of a user query. Requires a user to be logged in. Sends back the search_results.html file.

#### GET 'admin'
Views the admin dashboard. Requires that the logged in user is an admin, otherwise it goes to the index page. Sends back the admin-dashboard.html file.

### User Info Routes
#### POST 'users'
Adds a new user to the database. It takes in a profile picture link, password, display name, and bio from the front end. The login name is generated by the app. The user is saved to the database and a user object is returned.

#### POST '/users/login'
A route to login which will create a session. Takes in a password and username. If the user is not found, it redirects to the index. If the right user is found and the password is correct, it redirects to the dashboard.

#### POST 'viewUser'
Sets the session's userviewable to that of the passed in user id. Userviewable cannot be the same as the logged in user. Returns nothing.

#### GET 'userViewable'
Returns the session's viewable user data. Only returns required data.

#### GET 'userinfo'
Returns the logged in user's data.

#### GET 'Collectioninfo'
Finds and returns the collection of the logged in user that was just clicked.
Return the found collection.

#### POST 'viewCollection'
Saves the index of the collection that just clicked. Takes in the index value and returns nothing.

#### GET 'viewable_Collectioninfo'
Finds and returns the collection of the viewable user that was just clicked. Returns the found collection.

### Album Info Routes
#### GET 'albums'
Returns all the albums in the database.

#### POST 'viewAlbum'
Saves the id of the album the user is about to view in the session's album variable. Requires the user to be logged in.

#### GET 'albuminfo'
Send back the session's album data.

### Album Review Routes
#### POST 'saveReviewUser'
Takes a review and saves it to the logged in user's review array. The review body, album info, date of review, and rating are passed by the user. Returns the new review.

#### POST 'saveReviewAlbum'
Takes a review and saves it to the album's review array. The review body,
user info, date of review, and rating are passed by the user. Furthermore, it recalculates the album's average rating. Returns the new review.

### Favourite Albums Routes
#### GET 'albumFavourite'
Returns array of the logged in user's favourite albums list.

#### POST 'favourAlbum'
Adds an album to the user's favourite albums array. Takes in the album's id, name, and cover. Returns the updated user.

#### POST 'unfavourAlbum'
Removes an album from the user's favourite albums array. Takes in the album's id, name, and cover. Returns the updated user.

### Listened Albums Routes
#### GET 'albumListened'
Returns the logged in user's listened to albums.

#### POST 'addListenedAlbum'
Adds an album to the user's listened to array. Takes in the album's id, name, and cover. Returns the updated user.

#### POST 'removeFromListened'
Removes an album from the user's listened to album array. Takes in the album's id, name, and cover. Returns the updated user.

### To Listen Albums Routes
#### GET 'albumtoListen'
Returns array of the logged in user's albums they plan to listen to.

#### POST 'toListenAlbum'
Adds an album to the user's to listen to album array. Takes in the album's id, name, and cover. Returns the updated user.

#### POST 'removeToList'
Removes an album from the user's to listen to album array. Takes in the album's id, name, and cover. Returns the updated user.

### Viewing, Following, & Unfollowing Routes
#### GET 'userviewableinfo'
Returns the session's user and the viewable user info.

#### GET 'userFollowing'
Returns the session's user's friend list.

#### POST 'followUser'
Adds a user to the current user friend list. Passed in are the id, displayName, and profile picture of the user. Returns the updated user.

#### POST 'unfollowUser'
Remove a user from the current user friend list. Passed in are the id, displayNamem, and profile picture of the users. Returns the updated user.

### Image Handling Routes
#### POST 'image'
Uses the Cloudinary middleware and uploads a photo to the server. Takes in a file object. Returns a URL to the photo.

### Album Submission Routes
#### POST 'pendingAlbumSubmissions'
Creates an pending albums submission. Requires a user to be logged in. Takes in the album's title, cover, artist, producer, length, and details. Returns the new submission.

#### GET 'pendingAlbumSubmissions'
Returns all the pending albums. Requires the admin to be logged in. Returns informational summaries of the pending albums submissions.

#### GET '/editSubmission&album=:albumID'
Returns the editor pages for the pending album. Takes in an album id. Returns the admin-submission-editor.html

#### PATCH '/pendingAlbumSubmissions/:id'
Saves the changes to a pending album without approving it. Requires the admin to be logged in

####  POST '/album/:id'
Takes a pending album submission and saves it as an album. The logged in user must an admin. Requires the pending album id.

#### GET 'submissionDetails'
Returns the data of a pending album. The logged in user must be an admin.
