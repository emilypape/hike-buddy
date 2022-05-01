const signup = document.querySelector('#signup-btn')
const login = document.querySelector('#login-btn')

async function loginHandler(event) {
event.preventDefault()

// document.location.replace('/login')
const response = await fetch('/login', {
    method: 'get',
})
window.location.href = response.url
        // check response status
        if(response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
}

function signupHandler(event) {
 event.preventDefault()
 document.location.replace('/signup')
}

signup.addEventListener('click', signupHandler)

login.addEventListener('click', loginHandler)