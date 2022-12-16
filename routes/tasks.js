const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTssk,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getSingleTssk);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
