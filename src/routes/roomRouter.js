const express = require("express");
const roomRouter = express.Router();
const Room = require("../controller/roomController");

roomRouter.get("/getAllRoom", Room.getAllRoom);
roomRouter.post("/addRoom", Room.addRoom);
roomRouter.post("/addRoomType", Room.addRoomType);
roomRouter.put("/updateRoom", Room.updateRoom);
roomRouter.delete("/deleteRoom", Room.deleteRoom);
roomRouter.delete("/deleteRoomType", Room.deleteRoomType);
module.exports = roomRouter;
