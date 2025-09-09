import express from "express";
import { Task, User } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.success(task, 201);
  } catch (err) {
    res.error("Failed to create task", 400, err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.error("Task not found", 404);

    await task.update(req.body);
    res.success(task);
  } catch (err) {
    res.error("Failed to update task", 400, err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.error("Task not found", 404);

    await task.destroy();
    res.success({ message: "Task successfully deleted" });
  } catch (err) {
    res.error("Failed to delete task", 500, err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: User });
    res.success(tasks);
  } catch (err) {
    res.error("Failed to retrieve tasks", 500, err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) return res.error("Task not found", 404);

    res.success(task);
  } catch (err) {
    res.error("Failed to retrieve task", 500, err.message);
  }
});

export default router;
