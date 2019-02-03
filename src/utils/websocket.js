
// window.addEventListener("load", function(){ //when page loads
//   var lightbox = document.getElementById("light");
//   lightbox.addEventListener("change", function() { //add event listener for when checkbox changes
//     socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
//   });
// });
// Create WebSocket connection.
const socket = new WebSocket('ws://student2.local:8081');

// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});
