// create custom element for top navigation bar

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
    profile.href = '#profile'

    const albumSubmission = document.createElement('a')
    const albumSubmissionLinkText = document.createTextNode('Submit Album')
    albumSubmission.appendChild(albumSubmissionLinkText)
    albumSubmission.href = 'albumSubmissionPage.html'

    const searchForm = document.createElement('form')
    const loc = window.location.pathname.split('/')
    if (loc[loc.length - 2] == 'team54') {
      searchForm.action = 'search_results.html'
    }
    else {
      searchForm.action = '../search_results.html'
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

    document.body.appendChild(navBar)
  }
}

customElements.define('nav-bar', NavBar);
