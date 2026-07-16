const Project = require("../models/Project");

const groupProjects = async () => {
  const result = await Project.aggregate([
    {
      $group: {
        _id: "$category",
        totalProjects: {
          $sum: 1
        }
      }
    }
  ]);

  return result;
};

module.exports = groupProjects;