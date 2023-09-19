const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

  pathList: {
    type: "String",
  },
});

module.exports = mongoose.model("file_paths", lessonSchema);
