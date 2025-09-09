import express from "express";
import { Group, User } from "../models/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.success(group, 201);
  } catch (err) {
    res.error("Failed to create group", 400, err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);
    
    if (!group) return res.error("Group not found", 404);
    await group.update(req.body);
    res.success(group);
  } catch (err) {
    res.error("Failed to update group", 500, err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);

    if (!group) return res.error("Group not found", 404);
    await group.destroy();
    res.success({ message: "Group successfully deleted" });
  } catch (err) {
    res.error("Failed to delete group", 500, err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.success(groups);
  } catch (err) {
    res.error("Failed to retrieve groups data", 500, err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);

    if (!group) return res.error("Group not found", 404);
    res.success(group);
  } catch (err) {
    res.error("Failed to retrieve group", 500, err.message);
  }
});

router.get("/:id/users", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: { model: User, attributes: ["id", "name", "email"] },
      order: [[User, "id", "ASC"]],
    });

    if (!group) return res.error("Group not found", 404);
    res.success(group);
  } catch (err) {
    res.error("Failed to retrieve user data in group", 500, err.message);
  }
});

router.post("/:groupId/users/:userId", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.params.userId);

    if (!group || !user) return res.error("User or Group not found", 404);

    const isAlreadyMember = await group.hasUser(user);

    if (isAlreadyMember)
      return res.error("User is already a member of this group", 409);
    await group.addUser(user);
    res.success({
      message: `User ${user.name} successfully added to Group ${group.name}`,
      group: { id: group.id, name: group.name },
      user: { id: user.id, name: user.name },
    });
  } catch (err) {
    console.error("Error adding user to group:", err);
    res.error("Failed to add user to group", 500, err.message);
  }
});

router.delete("/:groupId/users/:userId", async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.params.userId);

    if (!group || !user) return res.error("User or Group not found", 404);

    const isMember = await group.hasUser(user);

    if (!isMember) return res.error("User is not a member of this group", 404);
    await group.removeUser(user);
    res.success({
      message: `User ${user.name} successfully removed from Group ${group.name}`,
    });
  } catch (err) {
    console.error("Error removing user from group:", err);
    res.error("Failed to remove user from group", 500, err.message);
  }
});


export default router;
