const Project = require("../models/Project");

const sortProjects = async () => {
  const result = await Project.aggregate([
    {
      $sort: {
        createdAt: -1
      }
    }
  ]);

  return result;
};

module.exports = sortProjects;