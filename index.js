
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors()); // Use the cors middleware;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(` a user connected : ${socket.id}`);

    socket.on("dynasty", function (re) {
        var jsonMap = {
            'message': re['message'], // Assuming 'text' is a field in 're'
            'dynasty_id': re['dynasty_id'],     // Assuming 'id' is a field in 're'
            // 'sent_at': DateTime.now().toString(), 
            'user_id' :  re['user_id']         // You can customize the time format
          };

        io.emit("received-dynasty",{message:jsonMap} )
        console.log(jsonMap);
    })
})

server.listen(5000, () => {
  console.log("SEVER RUNNING");
});












// Store group-specific messages in an object
// const groupMessages = {};

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join-group", (groupId) => {
//     // Join a specific group using the group ID
//     socket.join(groupId);

//     // Initialize an empty array for the group if it doesn't exist
//     if (!groupMessages[groupId]) {
//       groupMessages[groupId] = [];
//     }

//     // Send the group's chat history to the joining user
//     socket.emit("group-chat-history", groupMessages[groupId]);

//     // Notify the user who joined the group
//     io.to(groupId).emit("user-joined", { groupId, user: socket.id });
//   });

//   socket.on("send-message", (message) => {
//     console.log(message);

//     // Extract group ID and timestamp
//     const { groupId, timestamp, text } = message;

//     // Add the message to the group's chat history
//     if (groupId) {
//       if (!groupMessages[groupId]) {
//         groupMessages[groupId] = [];
//       }
//       groupMessages[groupId].push({ timestamp, text });

//       // Broadcast the message to all users in the group
//       io.to(groupId).emit("received-message", message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });


//const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// app.use(cors()); // to use the cors middleware;

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin:" http://localhost:5173",
//         methods : ["GET", "POST"]
// },
// });



// io.on("connection", (socket) => {
//     console.log(` User Connected : ${socket.id}`);

//     socket.on("send-message", (message) => {
//         console.log(message);
//         io.emit("received-message", message);
//     })

//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id)
//     });
// });


// server.listen(5000, () => {
//     console.log("SEVER RUNNING");
// });