import express from "express";
import { Group, User } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch {
    res.status(400).json({ error: "Failed to create group" });
  }
});

router.get("/", async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch {
    res.status(500).json({ error: "Failed to retrieve groups data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch {
    res.status(500).json({ error: "Failed to retrieve group" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    await group.update(req.body);
    res.json(group);
  } catch {
    res.status(500).json({ error: "Failed to update group" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    await group.destroy();
    res.json({ message: "Group successfully deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete group" });
  }
});

router.post("/:id/users/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    const user = await User.findByPk(req.params.id);

    if (!group || !user) {
      return res.status(404).json({ error: "User or Group not found" });
    }

    await group.addUser(user);
    res.json({
      message: `User ${user.name} successfully added to Group ${group.name}`,
    });
  } catch {
    res.status(500).json({ error: "Failed to add user to group" });
  }
});

router.get("/:id/users", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: User,
    });

    if (!group) return res.status(404).json({ error: "Group not found" });

    res.json(group);
  } catch {
    res.status(500).json({ error: "Failed to retrieve user data in group" });
  }
});

export default router;
