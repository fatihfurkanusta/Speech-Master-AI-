var sendButton = document.querySelector('.send-button');
var messageInput = document.querySelector('.message-input');
var chatContainer = document.querySelector('.chat-messages');

var data ={
    message : ""
};

function sendMessage(userMessage){
  try {
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resData => {
      chatbotResponse(resData.response);
      console.log(resData);
      console.log(resData.response);
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }

}

function showMessage(userMessage){
    var messageElement = document.createElement('div');
    messageElement.classList.add("user-message");
    messageElement.innerHTML = userMessage;

    chatContainer.appendChild(messageElement);
}

function chatbotResponse(responseMessage) {
  // Metni satır satır bölelim
  const lines = responseMessage.split('\n');

  // Her satırı yarım saniye aralıklarla ekrana yazdıralım
  lines.forEach((line, index) => {
      // Boş satırları görmezden gelelim
      if (line.trim() !== "") {
          setTimeout(() => {
              var messageElement = document.createElement('div');
              messageElement.classList.add("bot-message");
              messageElement.innerHTML = "<span>" + line + "</span>";

              chatContainer.appendChild(messageElement);
          }, index * 500); // index * 500 milisaniye (0.5 saniye) gecikme
      }
  });
}

function scrollToBottom() {
    var chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

sendButton.addEventListener('click', ()=>{
    
    var userMessage = messageInput.value;

    if(userMessage == ""){
        alert("!!! Please enter a valid message !!!");
    }else{
        data.message = userMessage.trim();
        messageInput.value="";
        sendMessage(data.message);
        showMessage(data.message);
        scrollToBottom();
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.querySelector(".message-input");
    const sendButton = document.querySelector(".send-button");
  
    messageInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
      }
    });
  });


module.exports = data;

  

  /* "One day, the Wind and the Sun were talking in the sky. The Wind said, 'I am stronger than you!' The Sun smiled and said, 'No, I think I am stronger than you!'" */
