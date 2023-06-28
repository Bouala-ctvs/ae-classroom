const gameModel = require("../../models/games/01_ReadGameModel");
const resModel = require("../../models/responseModel");

const getGameList = async (req, res, next) => {
    //    console.log(req.body);
    gameModel
        .find(req.body)
        .then((data) => {
            if (data.length <= 0) {
                res.status(200).json(resModel.responseData("03", "Data not found", []));
            } else {
                res.status(200).json(resModel.responseData("00", "Successful", data));
            }
        })
        .catch((err) => {
            res.status(200).json(resModel.responseData("01", err, []));
        });
};

const insertGame = async (req, res, next) => {
    //   console.log(req.body);
    gameModel
        .create(req.body)
        .then((err, data) => {
            res.status(200).json(resModel.responseData("00", "Successful", []));
        })
        .catch((err) => {
            res.status(200).json(resModel.responseData("01", err, []));
        });
};

const insertListGame = async (req, res, next) => {
    //   console.log(req.body);
    lessonsModel.deleteMany({
            lesson_class: 3
        }).then((err, data) => {
            var dataList = req.body.data_list;
            var errorCount = 0;
            var errMsg = "";
            for (let i = 0; i < dataList.length; i++) {
                const el = dataList[i];
                gameModel
                    .create(el)
                    .then((err, data) => {})
                    .catch((err) => {
                        errMsg = errMsg + err + "; ";
                        errorCount++;
                    });
            }
            if (errorCount <= 0) {
                res.status(200).json(resModel.responseData("00", "Successful", []));
            } else {
                res.status(200).json(resModel.responseData("01", errMsg, []));
            }
        })
        .catch((err) => {
            res.status(200).json(resModel.responseData("01", err, []));
        });

};

const updateGame = async (req, res, next) => {
    // console.log(req.params.id);
    //  console.log(req.body);
    gameModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then((err, data) => {
            res.status(200).json(resModel.responseData("00", "Successful", []));
        })
        .catch((err) => {
            res.status(200).json(resModel.responseData("01", err, []));
        });
};

const deleteGame = async (req, res, next) => {
    //     console.log(req.params.id);
    gameModel
        .findByIdAndDelete(req.params.id)
        .then((err, data) => {
            res.status(200).json(resModel.responseData("00", "Successful", []));
        })
        .catch((err) => {
            res.status(200).json(resModel.responseData("01", err, []));
        });

};

module.exports = {
    getGameList,
    insertGame,
    insertListGame,
    updateGame,
    deleteGame,
};