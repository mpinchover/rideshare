import { RideManager } from "./controllers/ride-manager";

const memory = new Set();

export const setupRoutes = (app: any, rideManager: RideManager) => {
  app.get("/get-all-users", (req: any, res: any) => {
    const users = rideManager.getAllActiveUsers();
    res.send({ success: true, users });
  });
};
