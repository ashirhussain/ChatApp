const socket=io();
const roomName=document.getElementById('room-name');
const usersList=document.getElementById('users');
socket.on('roomUsers',({users,room})=>{
    outputRoomName(room);
    outputUsers(users);
})

const {username,room} =Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
socket.emit('joinRoom',{username,room});
console.log(username,room)
const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)
    //scroll down when message arrives
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

chatForm.addEventListener('submit',(e)=>{
e.preventDefault();
const msg=e.target.elements.msg.value;
socket.emit('chatMessage',msg)
e.target.elements.msg.value='';
e.target.elements.msg.focus();
})

function outputMessage (message){
const div=document.createElement('div');
div.classList.add('message');
div.innerHTML=`	<p class="meta">${message.username}<span>${message.date}</span></p>
<p class="text">
    ${message.text}
</p>`;
document.querySelector('.chat-messages').appendChild(div);
}
function outputRoomName(room){
roomName.innerHTML=room;
}
function outputUsers(users){
    // console.log(users[0].username)
    // users.map(user=>console.log(user.name))
usersList.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`

}