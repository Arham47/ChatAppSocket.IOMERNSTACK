import express from "express";
import {
    createBrain,
    getBrains,
    getBrainById,
    updateBrain,
    deleteBrain,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createProject,
} from "../Controllers/ProjectController.js"; // Adjust the path accordingly

const router = express.Router();

// Create a new brain
router.post("/brains", createBrain);

// Get all brains
router.get("/brains", getBrains);

// Get a specific brain by ID
router.get("/brains/:id", getBrainById);

// Update a specific brain by ID
router.put("/brains/:id", updateBrain);

// Delete a specific brain by ID
router.delete("/brains/:id", deleteBrain);

router.post("/create", createProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;