const fetchMessagesBtns = document.querySelectorAll('#fetch-messages');
const senderMessage = document.querySelector('#sender-message');
const recipientMessage = document.querySelector('#recipient-message');
const messageTitle = document.querySelector('#exampleModalScrollableLabel')

async function fetchMessages(event) {
event.preventDefault()
    const username = this.textContent;
    const profilePictureSrc = this.closest('div').querySelector('img').src;
    const senderId = this.getAttribute('senderId')
    const userId = this.getAttribute('recipientId')
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
    usernameText.classList.add('conversationUsername')
    usernameText.textContent = username;
    messageTitle.appendChild(usernameText);


    // removes texts
    let dmList = $('.DM');
    if(dmList) {
        dmList.remove()
    };

   for(let i = 0; i < data.length; i++) {
    let senderDM = document.createElement('div')
    senderDM.classList.add('DM');
    senderDM.textContent = data[i].message_content;

    senderMessage.appendChild(senderDM)
   }

}



fetchMessagesBtns.forEach(fetchMessageButton => fetchMessageButton.addEventListener('click', fetchMessages))