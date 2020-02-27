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
  const loginForm = document.getElementsByClassName("login-form")[0];

  loginForm.addEventListener('submit', loginAttempt);

  function loginAttempt(e) {
  	e.preventDefault(); // prevent default form action

    const submittedUsername = e.srcElement.elements.username.value;
    const submittedPassword = e.srcElement.elements.password.value;

    if( submittedUsername == 'user' && submittedPassword =='user')
    {
      window.location.href = './users/user_0.html';
    }

    if( submittedUsername == 'user2' && submittedPassword =='user2')
    {
      window.location.href = './users/user_1.html';
    }

    if( submittedUsername == 'user3' && submittedPassword =='user3')
    {
      window.location.href = './users/user_1.html';
    }
    if(submittedUsername == 'admin' && submittedPassword == 'admin')
    {
      window.location.href = './admin/admin-dashboard.html';
    }
  }
