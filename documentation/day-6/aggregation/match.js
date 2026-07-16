const Project = require("../models/Project");

const matchProjects = async () => {
  const result = await Project.aggregate([
    {
      $match: {
        status: "completed"
      }
    }
  ]);

  return result;
};

module.exports = matchProjects;