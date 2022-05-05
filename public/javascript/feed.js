const newConversationBtn = document.querySelectorAll('#feed-message-btn');
const modalMessageBtn = document.querySelector('#modal-message-btn');

async function getLoggedInUser() {
  const response = await fetch('http://localhost:3009/api/users/who-am-i');
  const userData = await response.json();
  return userData;
}

async function startConversation() {
  let senderId = await getLoggedInUser();
  let recipientId = parseInt(this.getAttribute('recipientId'));

  const response = await fetch('/api/messages/send', {
    method: 'post',
    body: JSON.stringify({
      message_content: "Let's be Hike Buddies!",
      sender_id: senderId.user_id,
      recipient_id: recipientId,
    }),

    headers: {
      'Content-type': 'application/json',
    },
  });
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

newConversationBtn.forEach((newConversationBtn) => newConversationBtn.addEventListener('click', startConversation));
modalMessageBtn.addEventListener('click', message);
