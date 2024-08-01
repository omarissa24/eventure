import { Schema, model, models, Document } from "mongoose";

export interface ITask extends Document {
  _id: string;
  event: { _id: string; title: string };
  creator: { _id: string; firstName: string; lastName: string };
  title: string;
  description: string;
  status: string;
  deadline: Date;
  assignee: { _id: string; firstName: string; lastName: string };
}

const TaskSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignee: { type: Schema.Types.ObjectId, ref: "User" },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
