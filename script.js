const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Assign role (user1 or user2) on first visit
let role = localStorage.getItem('chatRole');
if (!role) {
  role = Math.random() < 0.5 ? 'user1' : 'user2';
  localStorage.setItem('chatRole', role);
}

// Submit message
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { text: input.value, role: role });
    input.value = '';
  }
});

// Display incoming message
socket.on('chat message', function (data) {
  const item = document.createElement('li');
  item.textContent = data.text;

  // Apply style based on who sent the message
  if (data.role === role) {
    item.classList.add('me');
  } else {
    item.classList.add('other');
  }

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

// Auto-refresh every 30 seconds
setTimeout(() => {
  location.reload();
}, 30000);
