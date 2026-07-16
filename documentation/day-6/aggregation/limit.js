const Project = require("../models/Project");

const limitProjects = async () => {
  const result = await Project.aggregate([
    {
      $limit: 5
    }
  ]);

  return result;
};

module.exports = limitProjects;