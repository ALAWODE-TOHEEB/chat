
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
    //     var jsonMap = {
    //         'message': re['message'], // Assuming 'text' is a field in 're'
    //         'dynasty_id': re['dynasty_id'],     // Assuming 'id' is a field in 're'
    //         // 'sent_at': DateTime.now().toString(), 
    //         'user_id' :  re['user_id']         // You can customize the time format
    //       };

        io.emit("received-dynasty",{message:re} )
        console.log(re);
    })
})

server.listen(5000, () => {
  console.log("SEVER RUNNING");
});
