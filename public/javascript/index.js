
const logoutIcon = document.querySelector('#logout-icon');
const homeFeedIcon = document.querySelector('#home-feed-icon');
const messageIcon = document.querySelector('#message-icon');

async function logout () {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }

}

async function message () {
    window.location.assign('http://localhost:3009/conversation/1')
}

messageIcon.addEventListener('click', message);
logoutIcon.addEventListener('click', logout);
