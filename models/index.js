import { User } from './user.js';
import { Group } from './group.js';
import { Task } from './task.js';

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export { User, Group, Task };
