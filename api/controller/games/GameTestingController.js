const gameModel = require("../../models/games/GameTestingModel");
const resModel = require("../../models/responseModel");
const fileModel = require("../../models/fileModel");


const fs = require('fs');
var path = require('path');
const _ = require('lodash');

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
    // console.log(req.body);
    var params = {
        lesson_class: req.body.data_list[0].lesson_class,
        game_id: req.body.data_list[0].game_id
    }
    gameModel.deleteMany(params).then((err, data) => {
        var dataList = req.body.data_list;
        var errorCount = 0;
        var errMsg = "";
        for (let i = 0; i < dataList.length; i++) {
            const el = dataList[i];
            gameModel
                .create(el)
                .then((err, data) => { })
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


const readFile = async (req, res, next) => {
    var folderList =req.body.folder_List;
    var isError = false;
    var errorString = ""
    var fileData = []
    fileModel.deleteMany()
    // .then((err, data) => {
    //     console.log("delete success");
    // })
    //     .catch((err) => {
    //         console.log("delete error");
    //     });
    for (let i = 0; i < folderList.length; i++) {
        const folder = folderList[i];
        var a = await getFileName(folder.gameID, folder.path, req.body.domain)
        for (let j = 0; j < a.length; j++) {
            const element = a[j];
            fileData.push(element);
        }
    }
    if (isError) {
        res.status(200).json(resModel.responseData("04", errorString, []));
    } else {
        res.status(200).json(resModel.responseData("00", "Successful", fileData));
    }

}

async function getFileName(game_id, folder, domain) {
    return new Promise(async (resolve, reject) => {
        var fileData = [];
        await fs.readdir(folder, async (err, files) => {
            if (err) {
                fileData = [];
                resolve(fileData)
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    fileData.push(domain + folder.replace(".", "") + "/" + file)
                }
                var body = {
                    gameID: game_id,
                    fileList: fileData.toString()
                }
                // console.log(body);
                await fileModel
                    .create(body)
                // .then((err, data) => {
                //     console.log("insert success");
                // })
                // .catch((err) => {
                //     console.log("insert error");
                // });

                resolve(fileData)
            }
        })
    })
}

module.exports = {
    getGameList,
    insertGame,
    insertListGame,
    updateGame,
    deleteGame,
    readFile,
};