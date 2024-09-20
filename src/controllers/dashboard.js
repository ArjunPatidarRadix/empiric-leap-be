const Projects = require("../models/project");

exports.getProjects = async (req, res, next) => {
  try {
    const response = await Projects.find();
    setTimeout(() => {
      res.status(200).send(response);
    }, 200);
    // res.status(200).send(rteresponse);
  } catch (error) {
    console.log("error: ", error);
  }
};
