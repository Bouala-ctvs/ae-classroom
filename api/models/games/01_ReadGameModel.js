const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    "lesson_class": {
        "type": "Number"
    },
    "lesson_num": {
        "type": "Number"
    },
    "game_id": {
        "type": "String"
    },
    "time": {
        "type": "Number"
    },
    "game_data": {
        "type": [
            "Mixed"
        ]
    }
});

module.exports = mongoose.model("01_game_reads", lessonSchema);