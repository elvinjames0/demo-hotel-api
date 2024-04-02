const { PrismaClient } = require("@prisma/client");
const {
  successCode,
  errorCode,
  successText,
  errorText,
  failText,
} = require("../utils/response");
const prisma = new PrismaClient();
const getAllRoom = async (req, res) => {
  try {
    const roomList = await prisma.ROOM_TYPE.findMany({
      include: {
        ROOM: true,
      },
    });
    successCode(res, roomList, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
const addRoom = async (req, res) => {
  try {
    const { room_type, room_number, status, balcony, fan, chair } = req.body;
    const data = { room_type, room_number, status, balcony, fan, chair };
    let newData = await prisma.ROOM.create({ data });
    successCode(res, newData, "Created!");
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteRoom = async (req, res) => {
  try {
    const { room_id } = req.body;
    const room = await prisma.ROOM.findUnique({
      where: { room_id: Number(room_id) },
    });
    if (room) {
      await prisma.ROOM.delete({ where: { room_id: Number(room_id) } });
      successCode(res, room, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const updateRoom = async (req, res) => {
  try {
    const { room_id, room_type, room_number, status, balcony, fan, chair } =
      req.body;
    const room = await prisma.ROOM.findUnique({
      where: { room_id: Number(room_id) },
    });
    if (room) {
      const data = { room_type, room_number, status, balcony, fan, chair };
      await prisma.ROOM.update({ where: { room_id: Number(room_id) }, data });
      successCode(res, data, "Updated!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(null, errorText);
  }
};
const addRoomType = async (req, res) => {
  try {
    const {
      type_name,
      room_quantity,
      price_by_day,
      price_by_first_hour,
      price_by_next_hour,
    } = req.body;
    const data = {
      type_name,
      room_quantity,
      price_by_day,
      price_by_first_hour,
      price_by_next_hour,
    };
    let newData = await prisma.ROOM_TYPE.create({ data });
    successCode(res, newData, "Created!");
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteRoomType = async (req, res) => {
  try {
    const { room_type } = req.body;
    const type = await prisma.ROOM_TYPE.findUnique({
      where: { room_type: Number(room_type) },
    });
    if (type) {
      await prisma.ROOM_TYPE.delete({
        where: { room_type: Number(room_type) },
      });
      successCode(res, type, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
module.exports = {
  getAllRoom,
  addRoom,
  deleteRoom,
  updateRoom,
  addRoomType,
  deleteRoomType,
};
