import express from "express";
import { User, Group, Task } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(400).json({ error: "Failed to create user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.json(user);
  } catch {
    res.status(400).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User successfully deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to retrieve users data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Group, Task],
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.get("/:id/groups", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "email"],
      include: [
        {
          model: Group,
          through: { attributes: [] },
        },
      ],
      order: [[Group, "id", "ASC"]],
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to retrieve user groups data" });
  }
});

router.get("/:id/tasks", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "email"],
      include: [
        {
          model: Task,
        },
      ],
      order: [[Task, "id", "ASC"]],
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to retrieve user tasks data" });
  }
});

export default router;
