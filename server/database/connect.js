const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/drugdb"
    );
    console.log(" Kết nối thành công 127.0.0.1");
  } catch (err) {
    console.error("❌ Kết nối thất bại", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
