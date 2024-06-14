import { Socket } from "socket.io";

export type Device = {
  userUuid: string;
  rideFrom: string;
  rideTo: string;
  ws: Socket;
  addedAt: number;
};
