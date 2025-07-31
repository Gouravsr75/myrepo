const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Assign a role (user1 or user2) to the current user
let role = localStorage.getItem('chatRole');
if (!role) {
  role = Math.random() < 0.5 ? 'user1' : 'user2';
  localStorage.setItem('chatRole', role);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { text: input.value, role: role });
    input.value = '';
  }
});

socket.on('chat message', function (data) {
  const item = document.createElement('li');
  item.textContent = data.text;

  // Style based on sender
  if (data.role === role) {
    item.classList.add('me');
  } else {
    item.classList.add('other');
  }

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);

  // Auto-delete message after 30 seconds
  setTimeout(() => {
    item.remove();
  }, 30000);
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
