const Automatic = require("../models/automatic");

const createTreeSystem = async (req, res) => {
  const { email, selectedPlant, selectedDate } = req.body; // Lấy giá trị của selectedPlant và selectedSystem từ req.body
  console.log(req.body); // In ra req.body lên console cho mục đích gỡ lỗi hoặc theo dõi

  // Tạo một đối tượng mới từ mô hình Tree với các giá trị đã lấy từ request body
  const tree = await Automatic({
    email,
    selectedPlant,
    selectedDate,
  });

  // Lưu đối tượng cây vào cơ sở dữ liệu
  await tree.save();

  // Trả về đối tượng cây đã được lưu vào cơ sở dữ liệu dưới dạng JSON response
  res.json(tree);
};

const getTreeSystemByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Lấy giá trị email từ request params

    // Gọi method findByEmail trên model Automatic để tìm kiếm đối tượng cây theo email
    const tree = await Automatic.findByEmail(email);

    // Nếu tìm thấy, trả về đối tượng cây dưới dạng JSON response
    if (tree) {
      res.json(tree);
    } else {
      res
        .status(404)
        .json({ success: false, message: "Không tìm thấy cây với email này!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi!" });
  }
};

const updateTreeSystemByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Lấy giá trị email từ request params
    const { selectedPlant, selectedDate } = req.body; // Lấy giá trị của selectedPlant và selectedSystem từ req.body
    // Tìm kiếm đối tượng cây theo email
    const tree = await Automatic.findByEmail(email);
    if (tree) {
      // Nếu tìm thấy, cập nhật selectedPlant và selectedSystem
      tree.selectedPlant = selectedPlant;
      tree.selectedDate = selectedDate;
      await tree.save(); // Lưu lại vào cơ sở dữ liệu
      res.json(tree); // Trả về đối tượng cây đã được cập nhật dưới dạng JSON response
    } else {
      res
        .status(404)
        .json({ success: false, message: "Không tìm thấy cây với email này!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi!" });
  }
};

module.exports = {
  createTreeSystem: createTreeSystem,
  getTreeSystemByEmail: getTreeSystemByEmail,
  updateTreeSystemByEmail: updateTreeSystemByEmail,
};
