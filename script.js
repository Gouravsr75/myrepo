const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// Lock screen logic
const correctPassword = "Nothingimp@75";

function unlock() {
  const userInput = document.getElementById("lockPassword").value;
  if (userInput === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    localStorage.setItem("chatUnlocked", "true");
  } else {
    alert("Wrong password!");
  }
}

function logout() {
  localStorage.removeItem("chatUnlocked");
  location.reload(); // Refresh to trigger lock
}

window.onload = () => {
  const isUnlocked = localStorage.getItem("chatUnlocked");
  if (isUnlocked !== "true") {
    document.getElementById("lockScreen").style.display = "flex";
  } else {
    document.getElementById("lockScreen").style.display = "none";
  }
};
// Auto-refresh page every 30 seconds (30,000 milliseconds)
setTimeout(() => {
  location.reload();
}, 30000); // 30 seconds
