const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// HOME API
app.get("/", (req, res) => {
    res.send("Portfolio API Running");
});


// PROJECT DATA
let projects = [
    {
        id: 1,
        title: "Job Portal",
        tech: "MERN Stack",
        description: "Full stack job portal website"
    },
    {
        id: 2,
        title: "Car Rental System",
        tech: "Java",
        description: "Car booking application"
    }
];


// 1. GET ALL PROJECTS
// GET PROJECTS WITH FILTERING + PAGINATION
app.get("/projects", (req, res) => {

    let result = projects;

    // Filtering
    if (req.query.tech) {
        result = result.filter(project =>
            project.tech.toLowerCase() === req.query.tech.toLowerCase()
        );
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    res.json(result.slice(startIndex, endIndex));
});

// 2. GET PROJECT BY ID
app.get("/projects/:id", (req, res) => {

    const project = projects.find(
        p => p.id == req.params.id
    );

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.json(project);
});


// 3. CREATE NEW PROJECT (POST)
app.post("/projects", (req, res) => {
if (!req.body.title || !req.body.tech || !req.body.description) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        tech: req.body.tech,
        description: req.body.description
    };

    projects.push(newProject);

    res.status(201).json(newProject);
});


// 4. UPDATE PROJECT (PUT)
app.put("/projects/:id", (req, res) => {

    const project = projects.find(
        p => p.id == req.params.id
    );

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    project.title = req.body.title;
    project.tech = req.body.tech;
    project.description = req.body.description;

    res.json(project);
});


// 5. DELETE PROJECT
app.delete("/projects/:id", (req, res) => {

    const projectIndex = projects.findIndex(
        p => p.id == req.params.id
    );

    if (projectIndex === -1) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    projects.splice(projectIndex, 1);

    res.json({
        message: "Project deleted successfully"
    });
});


// SERVER START
app.listen(5000, () => {
    console.log("Server started on port 5000");
});