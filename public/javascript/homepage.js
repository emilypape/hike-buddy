const signup = document.querySelector('#signup-btn')
const login = document.querySelector('#login-btn')

function loginHandler(event) {
event.preventDefault()

document.location.replace('/login')
}

function signupHandler(event) {
 event.preventDefault()
 document.location.replace('/signup')
}

signup.addEventListener('click', signupHandler)

login.addEventListener('click', loginHandler)