const logoutIcon = document.querySelector('#logout-icon');
const homeFeedIcon = document.querySelector('#home-feed-icon');
const messageIcon = document.querySelector('#message-icon');
const profileIcon = document.querySelector('#navbar-profile-pic');
const titlePageIcon = document.querySelector('#app-title');
const profilePicture = document.querySelector('#navbar-profile-pic img');

async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

async function getLoggedInUser() {
  const response = await fetch('http://localhost:3009/api/users/who-am-i');
  const userData = await response.json();
  return userData;
}

async function message() {
  const loggedInUser = await getLoggedInUser();
  const loggedInUserId = loggedInUser.user_id;
  window.location.assign(`http://localhost:3009/conversation/${loggedInUserId}`);
}

async function profile() {
  const loggedInUser = await getLoggedInUser();
  const loggedInUserId = loggedInUser.user_id;
  window.location.assign(`http://localhost:3009/users/${loggedInUserId}`);
}

async function homePage() {
  window.location.assign('/');
}

async function feedPage() {
  window.location.assign('/feed');
}

async function profilePic() {
  const loggedInUser = await getLoggedInUser();
  const profilePictureSrc = `/uploads/${loggedInUser.profile_picture}`;
  profilePicture.src = profilePictureSrc;
}

messageIcon.addEventListener('click', message);
logoutIcon.addEventListener('click', logout);
profileIcon.addEventListener('click', profile);
titlePageIcon.addEventListener('click', homePage);
homeFeedIcon.addEventListener('click', feedPage);

profilePic();
