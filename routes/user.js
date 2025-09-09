import express from "express";
import { User, Group, Task } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.success(user, 201);
  } catch (err) {
    res.error ("Failed to create user", 400, err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.error("User not found", 404);
    await user.update(req.body);
    res.success(user);
  } catch (err) {
    res.error("Failed to update user", 400, err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.error("User not found", 404);
    await user.destroy();
    res.success({ message: "User successfully deleted" });
  } catch (err) {
    res.error("Failed to delete user", 500, err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.success(users);
  } catch (err) {
    res.error("Failed to retrieve users data", 500, err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Group, Task],
    });

    if (!user) return res.error("User not found", 404);
    res.success(user);
  } catch (err) {
    res.error("Failed to retrieve user", 500, err.message);
  }
})

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

    if (!user) return res.error("User not found", 404);
    res.success(user);
  } catch (err) {
    res.error("Failed to retrieve user groups data", 500, err.message);
  }
});

router.get("/:id/tasks", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "email"],
      include: [
        { 
          model: Task 
        }
      ],
      order: [[Task, "id", "ASC"]],
    });

    if (!user) return res.error("User not found", 404);
    res.success(user);
  } catch (err) {
    res.error("Failed to retrieve user tasks data", 500, err.message);
  }
});

export default router;
