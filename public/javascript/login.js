const loginButton = document.querySelector('#loginButton');
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');

async function login() {
  if (usernameInput.value && passwordInput.value) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username: usernameInput.value,
        hashed_password: passwordInput.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // check response status
    if (response.ok) {
      console.log('success');
      usernameInput.value = '';
      passwordInput.value = '';
      // Need to route user to dashboard after logging in
      //window.location.href = `/dashboard`
    } else {
      alert(response.statusText);
    }
  }
}

const signupBtn = document.querySelector('#signup-btn');

async function signupHandler(event) {
  event.preventDefault();

  const response = await fetch('/signup', {
    method: 'get',
  });
  window.location.href = response.url;

  // check response status
  if (response.ok) {
    console.log('success');
  } else {
    alert(response.statusText);
  }
}

loginButton.addEventListener('click', login);
signupBtn.addEventListener('click', signupHandler);
