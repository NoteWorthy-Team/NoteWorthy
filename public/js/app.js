import NavBar from './NavBar'
import LoginForm from './LoginForm'

class App extends HTMLElement{
    constructor() {
        super()
    
        window.onload = function() {
            NavBar.render()
            LoginForm.render()
        }
    }
}

customElements.define('nav-bar', NavBar);
  customElements.define('login-form', LoginForm);
