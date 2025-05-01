import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TaskInput from "./Components/TaskInput";
import TaskItem from "./Components/TaskItem";
import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newReminderTime) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, reminderTime: newReminderTime }
          : task
      )
    );
  };

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Task Manager
            </Link>
          </div>
        </nav>
        <div className="container mt-4">
          <TaskInput onAddTask={addTask} />
          <ul className="list-group mt-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default App;
