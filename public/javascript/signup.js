async function signupFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (firstName && lastName && email && username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          hashed_password: password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        window.location.href = '/login';
        // document.location.replace('/');??

      } else {
        alert(response.statusText);
      }
    }
  };

  document.getElementById('#signup-btn').addEventListener('submit', signupFormHandler)