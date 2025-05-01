import { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedReminder, setEditedReminder] = useState(task.reminderTime);

  const handleSave = () => {
    onEdit(task.id, editedText, editedReminder);
    setIsEditing(false);
  };

  const formatReminderTime = (reminderTime) => {
    const date = new Date(reminderTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <li
      className={`list-group-item p-3 mb-3 shadow-sm rounded-lg bg-light ${
        task.reminderTriggered ? "bg-warning border border-primary" : ""
      }`}
    >
      {isEditing ? (
        <>
          <input
            className="form-control mb-2"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Edit task name"
          />
          <input
            type="datetime-local"
            className="form-control mb-2"
            value={editedReminder}
            onChange={(e) => setEditedReminder(e.target.value)}
          />
          <div className="d-flex gap-2">
            <button onClick={handleSave} className="btn btn-success">
              💾 Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className={`text-lg font-weight-bold ${
              task.done
                ? "text-muted text-decoration-line-through"
                : "text-dark"
            }`}
          >
            📌 {task.text}
          </div>
          <div className="text-sm mt-1">
            Status:{" "}
            <span
              className={`font-weight-bold ${
                task.done ? "text-success" : "text-danger"
              }`}
            >
              {task.done ? "Done ✅" : "Pending ⏳"}
            </span>
          </div>
          {task.reminderTime && (
            <div className="text-xs text-primary mt-1">
              🔔 Reminder set for: {formatReminderTime(task.reminderTime)}
            </div>
          )}
          <div className="d-flex gap-2 mt-3">
            <button
              onClick={() => onToggle(task.id)}
              className={`btn btn-${task.done ? "secondary" : "success"}`}
            >
              {task.done ? "↩️ Undo" : "✅ Mark Done"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-warning"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="btn btn-danger"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
