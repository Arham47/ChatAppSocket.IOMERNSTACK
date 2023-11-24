import BrainModel from "../Models/BrainModel.js";
import ProjectModel from "../Models/ProjectModel.js";
import TaskModel from "../Models/TaskModel.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json({
            status: 200,
            data: projects,
            message: "Projects retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Get a specific project by ID
export const getProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: project,
            message: "Project retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Update a specific project by ID
export const updateProject = async (req, res) => {
    const projectId = req.params.id;
    const {
        title,
        adminID,
        workSpace,
        brief,
        image,
        dueDate,
        onGoing,
        projectTag,
        adminMember,
        teamMember,
        inviteMessage,
    } = req.body;

    try {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found",
            });
        }

        // Update the project fields
        project.title = title;
        project.adminID = adminID;
        project.workSpace = workSpace;
        project.brief = brief;
        project.image = image;
        project.dueDate = dueDate;
        project.onGoing = onGoing;
        project.projectTag = projectTag;
        project.adminMember = adminMember;
        project.teamMember = teamMember;
        project.inviteMessage = inviteMessage;

        await project.save();

        res.status(200).json({
            status: 200,
            data: project,
            message: "Project updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Delete a specific project by ID
export const deleteProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({
                status: 404,
                message: "Project not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: deletedProject,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Async function to update the brief of a project
export const updateProjectBrief = async (req, res) => {
    const projectId = req.params.projectId;
    const newBrief = req.body.newBrief; // Assuming the new brief is sent in the request body

    try {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found",
            });
        }

        project.brief = newBrief;
        await project.save();

        return res.status(200).json({
            status: 200,
            data: {
                _id: project._id,
                title: project.title,
                brief: project.brief,
                // Include other properties you want in the response...
            },
            message: "Project brief updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};


export const createTask = async (req, res) => {
    const {
        taskName,
        taskDetails,
        workSpace,
        adminID,
        projectID,
        priorty,
        teamMember,
        dueDate,
        recurrenceOfTask,
        endOfRecurrenceOfTask,
        onGoing,
        taskTag,
        attachmentDetails,
        attachment,
    } = req.body;

    try {
        const task = await TaskModel.create({
            taskName,
            taskDetails,
            workSpace,
            adminID,
            projectID,
            priorty,
            teamMember,
            dueDate,
            recurrenceOfTask,
            endOfRecurrenceOfTask,
            onGoing,
            taskTag,
            attachmentDetails,
            attachment,
        });

        res.status(201).json({
            status: 201,
            data: {
                _id: task._id,
                taskName: task.taskName,
                // Include other properties you want in the response...
            },
            message: "Task created successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};
export const createProject = async (req, res) => {
    const {
      title,
      adminID,
      workSpace,
      brief,
      image,
      dueDate,
      onGoing,
      flowTag,
      adminMember,
      teamMember,
      inviteMessage,
    } = req.body;
  
    try {
   
  
      // Create a new project instance
      const newProject = new ProjectModel({
        title,
        adminID,
        workSpace,
        brief,
        image,
        dueDate,
        onGoing,
        flowTag,
        adminMember,
        teamMember,
        inviteMessage,
      });
  
      // Save the new project to the database
      const savedProject = await newProject.save();
      res.status(201).send(savedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// brainController.js



// Create a new brain
export const createBrain = async (req, res) => {
    const { workSpace, adminID, projectID, notes } = req.body;

    try {
        const brain = await BrainModel.create({
            workSpace,
            adminID,
            projectID,
            notes,
        });

        res.status(201).json({
            status: 201,
            data: {
                _id: brain._id,
                // Include other properties you want in the response...
            },
            message: "Brain created successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};

// Get all brains
export const getBrains = async (req, res) => {
    try {
        const brains = await BrainModel.find();
        res.status(200).json({
            status: 200,
            data: brains,
            message: "Brains retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Get a specific brain by ID
export const getBrainById = async (req, res) => {
    const brainId = req.params.id;

    try {
        const brain = await BrainModel.findById(brainId);

        if (!brain) {
            return res.status(404).json({
                status: 404,
                message: "Brain not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: brain,
            message: "Brain retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Update a specific brain by ID
export const updateBrain = async (req, res) => {
    const brainId = req.params.id;
    const { workSpace, adminID, projectID, notes } = req.body;

    try {
        const brain = await BrainModel.findById(brainId);

        if (!brain) {
            return res.status(404).json({
                status: 404,
                message: "Brain not found",
            });
        }

        // Update the brain fields
        brain.workSpace = workSpace;
        brain.adminID = adminID;
        brain.projectID = projectID;
        brain.notes = notes;

        await brain.save();

        res.status(200).json({
            status: 200,
            data: brain,
            message: "Brain updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Delete a specific brain by ID
export const deleteBrain = async (req, res) => {
    const brainId = req.params.id;

    try {
        const deletedBrain = await BrainModel.findByIdAndDelete(brainId);

        if (!deletedBrain) {
            return res.status(404).json({
                status: 404,
                message: "Brain not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: deletedBrain,
            message: "Brain deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({
            status: 200,
            data: tasks,
            message: "Tasks retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Get a specific task by ID
export const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: task,
            message: "Task retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Update a specific task by ID
export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const {
        taskName,
        taskDetails,
        workSpace,
        adminID,
        projectID,
        priorty,
        teamMember,
        dueDate,
        recurrenceOfTask,
        endOfRecurrenceOfTask,
        onGoing,
        taskTag,
        attachmentDetails,
        attachment,
    } = req.body;

    try {
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found",
            });
        }

        // Update the task fields
        task.taskName = taskName;
        task.taskDetails = taskDetails;
        task.workSpace = workSpace;
        task.adminID = adminID;
        task.projectID = projectID;
        task.priorty = priorty;
        task.teamMember = teamMember;
        task.dueDate = dueDate;
        task.recurrenceOfTask = recurrenceOfTask;
        task.endOfRecurrenceOfTask = endOfRecurrenceOfTask;
        task.onGoing = onGoing;
        task.taskTag = taskTag;
        task.attachmentDetails = attachmentDetails;
        task.attachment = attachment;

        await task.save();

        res.status(200).json({
            status: 200,
            data: task,
            message: "Task updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// Delete a specific task by ID
export const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                status: 404,
                message: "Task not found",
            });
        }

        res.status(200).json({
            status: 200,
            data: deletedTask,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

