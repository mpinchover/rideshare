const express = require("express");
import { setupEvents } from "./event-handler";
import { setupRoutes } from "./rest";

import { RideSeekers } from "./controllers/ride-seekers";
import { ChatClient } from "./clients/chat";
import { RideManager } from "./controllers/ride-manager";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// dependencies
const rideSeekers = new RideSeekers();
const chatClient = new ChatClient();

// controllers
const rideManager = new RideManager(rideSeekers, chatClient);

setupEvents(io, rideManager);
setupRoutes(app, rideManager);

// @ts-ignore
const PORT = parseInt(process.env.PORT) || 8080;

server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
