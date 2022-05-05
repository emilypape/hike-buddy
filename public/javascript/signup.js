const firstName = document.querySelector('#first-name-signup');
const lastName = document.querySelector('#last-name-signup');
const email = document.querySelector('#email-signup');
const username = document.querySelector('#username');
const password = document.querySelector('#password-signup');
const signupBtn = document.querySelector('#signup-btn');

async function signupFormHandler(event) {
    event.preventDefault();
  
    // if (firstName && lastName && email && username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          first_name: firstName.value,
          last_name: lastName.value,
          username: username.value,
          email: email.value,
          hashed_password: password.value
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      // check the response status
      if (response.ok) {
        console.log('success');


        window.location.href = '/survey';
        

      } else {
        alert(response.statusText);
      }
    // }
  };

signupBtn.addEventListener('click', signupFormHandler)