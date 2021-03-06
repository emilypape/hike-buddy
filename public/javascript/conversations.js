const fetchMessagesBtns = document.querySelectorAll('#fetch-messages');
const senderMessage = document.querySelector('#sender-message');
const recipientMessage = document.querySelector('#recipient-message');
const messageTitle = document.querySelector('#exampleModalScrollableLabel');
const messageInput = document.querySelector('#message-bar');
const sendBtn = document.querySelector('#send-btn');
let userMessageId;
let messagePartnerId;
let roomName;

const socket = io.connect();

socket.on('new-message', (message) => {
  // TODO: Display or append them to the page
  console.log('Message back from Socket: ', message);
  // TODO: append message payload as a child in message box
  let socketMessage = document.createElement('div');

  socketMessage.textContent = message.message_content;
  socketMessage.classList.add(
    'w-2/4',
    'DM',
    'px-4',
    'py-2',
    'text-white',
    'text-sm',
    'font-medium',
    'rounded-md',
    'mt-5',
  );
  if (message.sender_id == userMessageId) {
    socketMessage.classList.add('bg-green-500', 'ml-60');
  } else {
    socketMessage.classList.add('bg-blue-500');
  }

  senderMessage.appendChild(socketMessage);
});

async function fetchMessages(event) {
  event.preventDefault();
  const username = this.textContent;
  const profilePictureSrc = this.closest('div').querySelector('img').src;
  const senderId = this.getAttribute('senderId');
  messagePartnerId = senderId;
  const userId = this.getAttribute('recipientId');
  userMessageId = userId;
  roomName = [userId, senderId].sort().join();

  socket.emit('create', roomName);

  const response = await fetch(`https://still-shore-87425.herokuapp.com/api/messages/${userId}/${senderId}`, {
    method: 'get',
  });
  const data = await response.json();

  if (document.querySelector('.conversationPFP')) {
    document.querySelector('.conversationPFP').remove();
  }

  let profilePicture = document.createElement('img');
  profilePicture.classList.add('conversationPFP');
  profilePicture.src = profilePictureSrc;
  profilePicture.classList.add('w-20', 'h-20', 'rounded-full');
  messageTitle.appendChild(profilePicture);

  if (document.querySelector('.conversationUsername')) {
    document.querySelector('.conversationUsername').remove();
  }

  let usernameText = document.createElement('div');
  usernameText.classList.add('conversationUsername', 'space-y-1', 'text-black');
  usernameText.textContent = username;
  messageTitle.appendChild(usernameText);

  // removes texts
  let dmList = $('.DM');
  if (dmList) {
    dmList.remove();
  }

  for (let i = 0; i < data.length; i++) {
    // condition depending on data[i] for if is user or sender w/e
    let senderDM = document.createElement('div');
    senderDM.classList.add('w-2/4', 'DM', 'px-4', 'py-2', 'text-white', 'text-sm', 'font-medium', 'rounded-md', 'mt-5');
    senderDM.textContent = data[i].message_content;

    if (data[i].senderId == userId) {
      senderDM.classList.add('bg-green-500', 'ml-60');
    } else {
      senderDM.classList.add('bg-blue-500');
    }

    senderMessage.appendChild(senderDM);
  }
}

async function sendMessage() {
  const messageText = document.querySelector('#message-bar').value;
  const senderId = userMessageId;
  const recipientId = messagePartnerId;

  if (messageText) {
    const payload = {
      message_content: messageText,
      sender_id: senderId,
      recipient_id: recipientId,
    };

    const response = await fetch('https://still-shore-87425.herokuapp.com/api/messages/send', {
      method: 'post',
      body: JSON.stringify(payload),

      headers: {
        'Content-type': 'application/json',
      },
    });

    // socket.emit('new-message', payload);
    // console.log(socket);

    if (response.ok) {
      messageInput.value = '';
    } else {
      alert(response.statusText);
    }
  }
}

fetchMessagesBtns.forEach((fetchMessageButton) => fetchMessageButton.addEventListener('click', fetchMessages));
sendBtn.addEventListener('click', sendMessage);
