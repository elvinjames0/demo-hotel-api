const successCode = (res, data, message) => {
  return res.status(200).json({
    message,
    data,
    success: true,
  });
};

const failCode = (res, data, message = "Thành công", code = 400) => {
  return res.status(code).json({
    message,
    data,
    success: false,
  });
};

const errorCode = (res, message) => {
  return res.status(500).send(message);
};

const successText = "Get data successfully";
const errorText = "ERROR!";
const failText = "Cannot find data!";

module.exports = {
  successCode,
  failCode,
  errorCode,
  successText,
  errorText,
  failText,
};
