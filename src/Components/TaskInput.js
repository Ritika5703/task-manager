import { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [reminderTask, setReminderTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty!");
      return;
    }
    setError("");

    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
      reminderTime,
    };

    onAddTask(newTask);

    // Reminder alert logic (show modal on reminder time)
    const delay = new Date(reminderTime).getTime() - Date.now();
    if (reminderTime && delay > 0) {
      setTimeout(() => {
        setReminderTask(task); // Set the task text in the modal
        setShowModal(true); // Show the modal when reminder time is triggered
      }, delay);
    }

    // Reset input fields
    setTask("");
    setReminderTime("");
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setReminderTask(""); // Reset the reminder task
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm rounded-lg p-4 bg-light">
        <h2 className="h4 mb-3 text-primary">Add New Task 📝</h2>
        <div className="d-flex flex-column flex-md-row gap-3">
          <input
            type="text"
            className="form-control p-3 border-0 rounded-lg shadow-sm"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="datetime-local"
            className="form-control p-3 border-0 rounded-lg shadow-sm"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="btn btn-primary w-100 w-md-auto py-3"
          >
            Add Task
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      {/* Modal for reminder notification */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", position: "fixed", zIndex: 1050 }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="reminderModal"
          aria-hidden="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-lg shadow-lg">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title" id="reminderModal">
                  📅 Reminder
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  ⏰ It's time to complete your task:{" "}
                  <strong>{reminderTask}</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
