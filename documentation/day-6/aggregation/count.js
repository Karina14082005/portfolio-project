const Project = require("../models/Project");

const countProjects = async () => {
  const result = await Project.aggregate([
    {
      $count: "totalProjects"
    }
  ]);

  return result;
};

module.exports = countProjects;