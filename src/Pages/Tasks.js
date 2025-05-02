import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import ReminderModal from "../Components/ReminderModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminderTime, setReminderTime] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTask, setReminderTask] = useState(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      text: newTask.trim(),
      priority,
      status: "Pending",
      reminder: reminderTime,
      dueDate,
      createdAt: new Date().toISOString(),
      notified: false,
    };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        ...updatedTasks[editIndex],
        ...task,
        createdAt: updatedTasks[editIndex].createdAt, // Preserve original createdAt
      };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setNewTask("");
    setPriority("Medium");
    setReminderTime("");
    setDueDate("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === "Pending" ? "Completed" : "Pending";
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setEditIndex(index);
    setNewTask(task.text);
    setPriority(task.priority);
    setReminderTime(task.reminder || "");
    setDueDate(task.dueDate || "");
  };

  const getPriorityVariant = (level) => {
    switch (level) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  // Reminder logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTasks = tasks.map((task) => {
        if (task.reminder && new Date(task.reminder) <= now && !task.notified) {
          setReminderTask(task);
          setShowReminderModal(true);
          return { ...task, notified: true };
        }
        return task;
      });
      setTasks(updatedTasks);
    }, 60000); // Every 60 sec

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Task Manager</h2>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        priority={priority}
        setPriority={setPriority}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleAddTask={handleAddTask}
        editIndex={editIndex}
      />
      <div className="d-flex justify-content-center mb-3 gap-2">
        {["All", "Pending", "Completed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "primary" : "outline-primary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      <TaskList
        filteredTasks={filteredTasks}
        handleToggleStatus={handleToggleStatus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        getPriorityVariant={getPriorityVariant}
      />
      <ReminderModal
        showReminderModal={showReminderModal}
        setShowReminderModal={setShowReminderModal}
        reminderTask={reminderTask}
      />
    </Container>
  );
};

export default Tasks;
