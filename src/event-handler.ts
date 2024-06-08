import { Socket } from "socket.io";
import { io } from "./";

io.on("connection", (socket: Socket) => {
  console.log("Got a connection from client");
  socket.emit("connection", { message: "welcome to the server" });

  socket.on("update", (msg: any) => {
    console.log("Rcvd ", msg);
    console.log("Got update");
    socket.emit("update", { message: "got your update" });
  });

  // add new ride seeker into the ride seekers map
  socket.on("new_ride_seeker", (msg: any) => {});

  // every 10 seconds, client will send an event seeking ride seeker
  socket.on("check_for_ride_seeker", (msg: any) => {});

  // remove from map if not yet removed
  socket.on("disconnect", (msg: any) => {});
  socket.on("connection_error", (msg: any) => {});
  socket.on("eroror", (msg: any) => {});
  socket.on("connect_error", (msg: any) => {});
});
