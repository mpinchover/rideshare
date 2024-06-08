const io = require("socket.io-client");
const socket = io("https://rideshare-ioa6aku2ia-ue.a.run.app"); // Adjust the port if necessary

socket.on("connection", () => {
  console.log("Connected to the server");

  setTimeout(() => {
    console.log("Sending an update");
    socket.emit("update", {
      msg: "Here is an update",
    });
  }, 2000);

  socket.on("update", (msg) => {
    console.log("Got update", msg);
  });

  socket.on("connect_error", (err) => {
    console.log("Connection Error:", err.message);
  });

  socket.on("connect_timeout", (timeout) => {
    console.log("Connection Timeout:", timeout);
  });

  socket.on("reconnect_attempt", () => {
    console.log("Reconnecting attempt");
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
