import express from "express";
import { Task, User } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch {
    res.status(400).json({ error: "Failed to create task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: User });
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch {
    res.status(400).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.json({ message: "Task successfully deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
