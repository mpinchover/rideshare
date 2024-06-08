import { ChatClient } from "../clients/chat";
import { Device } from "../types/entites/device";
import { newRideSeekerEvent } from "../types/events/ride-seeker";
import { RideSeekers } from "./ride-seekers";
class RideManager {
  rideSeekers: RideSeekers;
  chatClient: ChatClient;
  constructor(rideSeekers: RideSeekers, chatClient: ChatClient) {
    this.rideSeekers = rideSeekers;
    this.chatClient = chatClient;
  }

  addNewRideSeeker = () => {
    // check to see if there's an existing device trying to find a ride

    //
    this.rideSeekers.addDevice();
  };

  // event should be sent every 10 seconds
  checkForRideSeeker = (newRideSeekerEvent: newRideSeekerEvent) => {
    // check to see if there is a rider
    const existingRideSeeker = this.rideSeekers.findDeviceByStartEnd(
      newRideSeekerEvent.fromLocation,
      newRideSeekerEvent.toLocation
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
      this.chatClient.createChatRoom();

      // send an event back to client to notify them of a create chat
      this.notifyClientsPairingSuccess([newRideSeeker, existingRideSeeker]);

      // close all connections
      this.closeDeviceConn([newRideSeeker, existingRideSeeker]);
    }
  };

  notifyClientsPairingSuccess = (devices: Device[]) => {
    for (const dev of devices) {
      dev.ws.emit("ride_seeker_pairing_success", {
        success: true,
      });
    }
  };

  closeDeviceConn = (devices: Device[]) => {
    for (const dev of devices) {
      dev.ws.disconnect();
    }
  };
}
