import { ChatClient } from "../clients/chat";
import { Device } from "../types/entities/device";
import { NewRideSeekerEvent } from "../types/events/ride-seeker";
import { RideSeekers } from "./ride-seekers";
import { Socket } from "socket.io";

export class RideManager {
  rideSeekers: RideSeekers;
  chatClient: ChatClient;
  constructor(rideSeekers: RideSeekers, chatClient: ChatClient) {
    this.rideSeekers = rideSeekers;
    this.chatClient = chatClient;
  }

  addNewRideSeeker = (msg: NewRideSeekerEvent, ws: Socket) => {
    const device: Device = {
      userUuid: msg.userUuid,
      rideTo: msg.rideTo,
      rideFrom: msg.rideFrom,
      ws,
      addedAt: new Date().getTime(),
    };
    this.rideSeekers.addDevice(device);

    ws.emit("add_new_ride_seeker_success", {
      msg: "added your device to seekers",
    });
  };

  // event should be sent every 10 seconds
  checkForRideSeeker = (newRideSeekerEvent: NewRideSeekerEvent) => {
    try {
      // check to see if there is a rider
      const existingRideSeeker = this.rideSeekers.findDeviceByStartEnd(
        newRideSeekerEvent.userUuid,
        newRideSeekerEvent.rideFrom,
        newRideSeekerEvent.rideTo
      );

      if (existingRideSeeker) {
        const newRideSeeker = this.rideSeekers.findDeviceByUserUuid(
          newRideSeekerEvent.userUuid
        );

        // remove both devices if you find one.
        this.rideSeekers.removeDeviceByUuid([
          newRideSeekerEvent.userUuid,
          existingRideSeeker.userUuid,
        ]);

        // get the chat user uuids
        // create a chat between them
        this.chatClient.createChatRoom([
          newRideSeekerEvent.userUuid,
          existingRideSeeker.userUuid,
        ]);

        // send an event back to client to notify them of a create chat
        this.notifyClientsPairingSuccess([newRideSeeker, existingRideSeeker]);

        // close all connections
        this.closeDeviceConn([newRideSeeker, existingRideSeeker]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // send back the chatroom info?
  notifyClientsPairingSuccess = (devices: Device[]) => {
    const dev1 = devices[0];
    const dev2 = devices[1];

    dev1.ws.emit("ride_seeker_pairing_success", {
      success: true,
      message: "www.linktochatroom.com",
      pairedWith: dev2.userUuid,
    });

    dev2.ws.emit("ride_seeker_pairing_success", {
      success: true,
      message: "www.linktochatroom.com",
      pairedWith: dev1.userUuid,
    });
  };

  closeDeviceConn = (devices: Device[]) => {
    for (const dev of devices) {
      dev.ws.disconnect();
    }
  };

  getAllActiveUsers = () => {
    return this.rideSeekers.getActiveUsers();
  };
}
