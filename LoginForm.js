class LoginForm extends HTMLElement {
    constructor() {
      super()
      this.renderElement = this.renderElement.bind(this)
      this.renderElement()
    }

    renderElement() {
      const login = document.createElement('div')
      login.className = 'login-form'

      const username = document.createElement('input')
      username.name = 'username'
      username.type = 'text'
      username.placeholder = 'Username'

      const password = document.createElement('input')
      password.name = 'password'
      password.type = 'password'
      password.placeholder = 'Password'

      const submit = document.createElement('input')
      submit.value = 'Sign In'
      submit.type = 'submit'

      login.appendChild(username)
      login.appendChild(document.createElement('br'))
      login.appendChild(password)
      login.appendChild(document.createElement('br'))
      login.appendChild(submit)

      document.body.appendChild(login)
    }
  }
  
  customElements.define('login-form', LoginForm);