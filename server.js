import express from "express";
import { sequelize } from "./config/db.js";
import userRoutes from "./routes/user.js";
import groupRoutes from "./routes/group.js";
import taskRoutes from "./routes/task.js";
import responseMiddleware from "./middleware/response.js";

const app = express();
app.use(express.json());
app.use(responseMiddleware); 

app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/tasks", taskRoutes);

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect:", err));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
