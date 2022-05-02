const fetchMessagesBtns = document.querySelectorAll('#fetch-messages');
const senderMessage = document.querySelector('#sender-message');
const recipientMessage = document.querySelector('#recipient-message');
const messageTitle = document.querySelector('#exampleModalScrollableLabel')
const messageInput = document.querySelector('#message-bar');
const sendBtn = document.querySelector('#send-btn');
let userMessageId;
let messagePartnerId;

async function fetchMessages(event) {
event.preventDefault()
    const username = this.textContent;
    const profilePictureSrc = this.closest('div').querySelector('img').src;
    const senderId = this.getAttribute('senderId')
    messagePartnerId = senderId;
    const userId = this.getAttribute('recipientId')
    userMessageId = userId;
    const response = await fetch(`http://localhost:3009/api/messages/${userId}/${senderId}`, {
        method: 'get'
    })
    const data = await response.json()

    if (document.querySelector('.conversationPFP')) {
        document.querySelector('.conversationPFP').remove();
    }

    let profilePicture = document.createElement('img');
    profilePicture.classList.add('conversationPFP')
    profilePicture.src = profilePictureSrc;
    profilePicture.classList.add('w-20', 'h-20', 'rounded-full')
    messageTitle.appendChild(profilePicture);

    if (document.querySelector('.conversationUsername')) {
        document.querySelector('.conversationUsername').remove();
    }

    let usernameText = document.createElement('div');
    usernameText.classList.add('conversationUsername', 'space-y-1', 'text-black')
    usernameText.textContent = username;
    messageTitle.appendChild(usernameText);


    // removes texts
    let dmList = $('.DM');
    if(dmList) {
        dmList.remove()
    };

   for(let i = 0; i < data.length; i++) {
    let senderDM = document.createElement('div')
    senderDM.classList.add('DM', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'text-sm', 'font-medium', 'rounded-full', 'mt-5');
    senderDM.textContent = data[i].message_content;

    senderMessage.appendChild(senderDM)
   }

}

async function sendMessage () {

    const messageText = document.querySelector('#message-bar').value;
    const senderId = userMessageId;
    const recipientId = messagePartnerId;

    if(messageText) {
        const response = await fetch('http://localhost:3009/api/messages/send', {
            method: 'post',
            body: JSON.stringify({
                message_content: messageText,
                sender_id: senderId,
                recipient_id: recipientId,
            }),

            headers: {
            "Content-type": "application/json"
        }
        })
        if (response.ok) {
            messageInput.value = '';
          } else {
            alert(response.statusText);
          }
    }
}



fetchMessagesBtns.forEach(fetchMessageButton => fetchMessageButton.addEventListener('click', fetchMessages));
sendBtn.addEventListener('click', sendMessage);