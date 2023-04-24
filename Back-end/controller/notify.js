const Notify = require("../models/notify");

const createNotify = async (req, res) => {
  const { notify_id, content } = req.body;
  console.log(req.body);
  const notify = await Notify({
    notify_id,
    content,
  });

  await notify.save();

  res.json(notify);
};

const getNotify = async (req, res) => {
  try {
    const notify_id = req.params.notify_id;

    const notify = await Notify.findById(notify_id);

    if (notify) {
      res.json(notify);
    } else {
      res
        .status(404)
        .json({
          success: false,
          message: "Không tìm thấy thông báo với id này!",
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi!" });
  }
};

module.exports = {
  createNotify,
  getNotify,
};
