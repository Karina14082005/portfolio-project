const Project = require("../models/Project");

const projectFields = async () => {
  const result = await Project.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        category: 1,
        status: 1
      }
    }
  ]);

  return result;
};

module.exports = projectFields;