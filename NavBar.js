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
    albumSubmission.href = '#album-submission'

    const searchBar = document.createElement('input')
    searchBar.type = 'text'
    searchBar.placeholder = 'Search for an album...'

    navBar.appendChild(searchBar)
    navBar.appendChild(profile)
    navBar.appendChild(albumSubmission)

    document.body.appendChild(navBar)
  }
}

customElements.define('nav-bar', NavBar);
