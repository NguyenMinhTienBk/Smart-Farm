const Device = require("../models/device");

const createDevice = async (req, res) => {
  const { device_id } = req.body;
  console.log(req.body);
  const device = await Device({
    device_id,
  });

  await device.save();

  res.json(device);
};

const getDevice = async (req, res) => {
  try {
    const device = await Device.find({}, "device_id");
    res.json(device);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server");
  }
};

module.exports = {
  createDevice,
  getDevice,
};
