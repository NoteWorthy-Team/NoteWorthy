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