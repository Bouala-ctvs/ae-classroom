const lessonsModel = require("../models/lessons");
const resModel = require("../models/responseModel");

const getLessonList = async (req, res, next) => {
  //   console.log(req.body);
  lessonsModel
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

const insertLesson = async (req, res, next) => {
  //   console.log(req.body);
  lessonsModel
    .create(req.body)
    .then((err, data) => {
      res.status(200).json(resModel.responseData("00", "Successful", []));
    })
    .catch((err) => {
      res.status(200).json(resModel.responseData("01", err, []));
    });
};

const insertListLesson = async (req, res, next) => {
  //  console.log(req.body);
  var dataList = req.body.data_list;
  var errorCount = 0;
  var errMsg = "";
  lessonsModel.deleteMany({
      lesson_class: dataList[0].lesson_class
    }).then((err, data) => {
      for (let i = 0; i < dataList.length; i++) {
        const el = dataList[i];
        lessonsModel
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
      console.log(err);
      res.status(200).json(resModel.responseData("01", err, []));
    });

};

const updateLesson = async (req, res, next) => {
  // console.log(req.params.id);
  //  console.log(req.body);
  lessonsModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((err, data) => {
      var dataList = req.body.data_list;
      var errorCount = 0;
      var errMsg = "";
      for (let i = 0; i < dataList.length; i++) {
        const el = dataList[i];
        lessonsModel
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

const deleteLesson = async (req, res, next) => {
  //     console.log(req.params.id);
  lessonsModel
    .findByIdAndDelete(req.params.id)
    .then((err, data) => {
      res.status(200).json(resModel.responseData("00", "Successful", []));
    })
    .catch((err) => {
      res.status(200).json(resModel.responseData("01", err, []));
    });

  /*delete multiple recards*/
  //   lessonsModel.deleteMany({lesson_class:2}).then((err, data) => {
  //       res.status(200).json(resModel.responseData("00", "Successful", []));
  //     })
  //     .catch((err) => {
  //       res.status(200).json(resModel.responseData("01", err, []));
  //     });
};



module.exports = {
  getLessonList,
  insertLesson,
  insertListLesson,
  updateLesson,
  deleteLesson,
};
