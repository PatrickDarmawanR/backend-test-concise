import { User } from "./user.js";
import { Group } from "./group.js";
import { Task } from "./task.js";

User.belongsToMany(Group, {
  through: "UserGroups",
  foreignKey: "userId",
  otherKey: "groupId",
});
Group.belongsToMany(User, {
  through: "UserGroups",
  foreignKey: "groupId",
  otherKey: "userId",
});

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

export { User, Group, Task };