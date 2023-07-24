const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

  gameID: {
    type: "String",
  },
  fileList: {
    type: "String",
  },
});

module.exports = mongoose.model("files", lessonSchema);
