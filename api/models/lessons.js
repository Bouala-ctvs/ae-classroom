const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lesson_num: {
    type: "Number",
    require: true,
  },
  lesson_topic: {
    type: "String",
  },
  lesson_class: {
    type: "Number",
    require: true,
  },
  start_page: {
    type: "Number",
  },
  end_page: {
    type: "Number",
  },
});

module.exports = mongoose.model("lessons", lessonSchema);
