import { Device } from "../types/entites/device";
export class RideSeekers {
  seekers: Map<String, Device>;
  constructor() {
    this.seekers = new Map<String, Device>();
  }

  addDevice() {}

  removeDeviceByUuid(uuids: string[]) {
    for (const uuid of uuids) {
      delete this.seekers[uuid];
    }
  }

  findDeviceByUserUuid(uuid: string): Device {
    return this.seekers[uuid];
  }

  findDeviceByDestination() {}

  findDeviceByStart() {}

  findDeviceByStartEnd(start: string, end: string): Device {
    for (const uuid in this.seekers) {
      const device = this.seekers.get(uuid);
      if (device?.rideFrom === start && device?.rideTo === end) {
        return device;
      }
    }

    return null;
  }
}
