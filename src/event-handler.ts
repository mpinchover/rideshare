import { Socket } from "socket.io";
import { RideManager } from "./controllers/ride-manager";

export const setupEvents = (io: any, rideManager: RideManager) => {
  io.on("connection", (socket: Socket) => {
    socket.emit("connection", { message: "welcome to the server" });

    // socket.on("update", (msg: any) => {
    //   console.log("Rcvd ", msg);
    //   console.log("Got update");
    //   socket.emit("update", { message: "got your update" });
    // });

    // add new ride seeker into the ride seekers map
    socket.on("add_new_ride_seeker", (msg) => {
      rideManager.addNewRideSeeker(msg, socket);
    });

    // every 10 seconds, client will send an event seeking ride seeker
    socket.on("check_for_ride_seeker", rideManager.checkForRideSeeker);

    // remove from map if not yet removed
    socket.on("disconnect", (msg: any) => {
      console.log("client disconnected");
    });
    socket.on("connection_error", (msg: any) => {});
    socket.on("eroror", (msg: any) => {});
    socket.on("connect_error", (msg: any) => {});
  });
};
