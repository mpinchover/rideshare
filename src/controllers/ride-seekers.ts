import { Socket } from "socket.io";
import { Device } from "../types/entities/device";
export class RideSeekers {
  seekers: Map<String, Device>;
  constructor() {
    this.seekers = new Map<String, Device>();
  }

  addDevice(dev: Device) {
    this.seekers.set(dev.userUuid, dev);
  }

  getActiveUsers() {
    return Array.from(this.seekers.keys());
  }

  removeDeviceByUuid(uuids: string[]) {
    for (const uuid of uuids) {
      this.seekers.delete(uuid);
    }
  }

  getSocketByUserUuid(uuid: string): Socket {
    return this.seekers.get(uuid)?.ws;
  }

  findDeviceByUserUuid(uuid: string): Device {
    return this.seekers.get(uuid);
  }

  findDeviceByDestination() {}

  findDeviceByStart() {}

  findDeviceByStartEnd(seekerUuid, start: string, end: string): Device {
    for (let [userUuid, device] of this.seekers.entries()) {
      if (seekerUuid === userUuid) {
        continue;
      }

      if (device?.rideFrom === start && device?.rideTo === end) {
        return device;
      }
    }
    return null;
  }
}
