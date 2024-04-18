const express = require("express");
const roomRouter = express.Router();
const Room = require("../controller/roomController");

roomRouter.get("/getAllRoom", Room.getAllRoom);
roomRouter.get("/getAllRoomType", Room.getAllRoomType);
roomRouter.get("/getAllRoomTable", Room.getAllRoomTable);
roomRouter.get("/getDetailRoom/:id", Room.getDetailRoom);
roomRouter.post("/addRoom", Room.addRoom);
roomRouter.post("/addRoomType", Room.addRoomType);
roomRouter.put("/updateRoom", Room.updateRoom);
roomRouter.delete("/deleteRoom/:id", Room.deleteRoom);
roomRouter.delete("/deleteRoomType/:id", Room.deleteRoomType);
module.exports = roomRouter;
