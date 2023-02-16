var socket = io('http://127.0.0.1:8000');
// var socket = io('http://localhost:8000');


const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer= document.querySelector('.container');

var audio= new Audio('img/msg_inc.mp3');

const append = (message,position)=>{
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);

     if(position == 'left'){
         audio.play();
     }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // by default the page won't be loaded
    const message= messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
    // clear the message input space
})

const name= prompt('Enter your name to join:');
socket.emit('new-user-joined', name);

// Event listener (listen to events which are called at server)
socket.on('user-joined', name =>{
    append(`${name} joined the chat.`, 'left');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name =>{
    append(`${name} left the chat.`, 'left')
    	
})