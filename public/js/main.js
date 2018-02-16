(() =>{
  const socket = io();

  let messageList = document.querySelector('ul'),
    chatForm = document.querySelector('form'),
    chatMessage = chatForm.querySelector('.message'),
    nameInput = document.querySelector('.nickname'),
    nickName = null;

  function appendMessage(msg)
  {
    let newMsg = `<li>${msg.message}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDiscMessage(msg)
  {
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function handleSendMessage(e)
  {
    console.log("hi");
    e.preventDefault();
    nickName = (nickName && nickName.length > 0) ? nickName : 'user';
    msg = `${nickName} : ${chatMessage.value}`;
    socket.emit('chat message', msg);
    chatMessage.value = "";
    return false;
  }

  function closeLogin(e)
  {
    if(e.code == 'Enter'){
    console.log("loginGone");
    let login =  document.querySelector("#login");
    let welcome = document.querySelector("#welcome");
    login.style.display = "none";
    welcome.innerHTML = "Welcome To The Chat " + nickName;
  }
}

  function setNickname()
  {
    nickName = this.value;
    nameInput.addEventListener("keyup", closeLogin, false);
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDiscMessage, false);
})();
