// create custom element for top navigation bar

const URL = "https://intense-scrubland-22709.herokuapp.com/"

class NavBar extends HTMLElement {
  constructor() {
    super()
    this.renderElement = this.renderElement.bind(this)
    this.renderElement()
  }

  renderElement() {
    const navBar = document.createElement('div')
    navBar.className = 'nav-bar'

    const profile = document.createElement('a')
    const profileLinkText = document.createTextNode('Profile')
    profile.appendChild(profileLinkText)

    const albumSubmission = document.createElement('a')
    const albumSubmissionLinkText = document.createTextNode('Submit Album')
    albumSubmission.appendChild(albumSubmissionLinkText)
    albumSubmission.href = URL + 'submitalbum'
    

    const searchForm = document.createElement('form')
    const loc = window.location.pathname.split('/')
    if (loc[loc.length - 2] == 'team54') {
      searchForm.action = 'search_results.html'
      albumSubmission.href = URL + 'submitalbum'

      // we are using user 0 because user 0 is the user that logs in
      // with username "user" and password "user"
      profile.href = URL + 'dashboard'
    }
    else {
        searchForm.action = URL + 'searchResult'
      albumSubmission.href = URL + 'submitalbum'
      profile.href = URL + 'dashboard'
    }
    searchForm.method = 'GET'

    const searchBar = document.createElement('input')
    searchBar.name = 'albumName'
    searchBar.type = 'text'
    searchBar.placeholder = 'Search for an album...'

    const searchSubmit = document.createElement('input')
    searchSubmit.value = 'Submit'
    searchSubmit.type = 'submit'

    searchForm.appendChild(searchBar)
    searchForm.appendChild(searchSubmit)

    navBar.appendChild(searchForm)
    navBar.appendChild(profile)
    navBar.appendChild(albumSubmission)
    // Determine whether to render Pending Submissions link
    const isAdminURL = '/userIsAdmin';
    fetch(isAdminURL).then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json()
      }
    })
    .then((json) => {
      if (json.userIsAdmin) {
        const pendingSubmissions = document.createElement('a')
        const pendingSubmissionsLinkText = document.createTextNode('Pending Submissions')
        pendingSubmissions.id = 'pending-submissions'
        pendingSubmissions.appendChild(pendingSubmissionsLinkText)
        pendingSubmissions.href = URL + 'admin'
        navBar.appendChild(pendingSubmissions)
      }
    })
    document.body.appendChild(navBar)
  }
}

customElements.define('nav-bar', NavBar);
