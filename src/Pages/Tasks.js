import { useState } from "react";
import TaskInput from "../Components/TaskInput";
import TaskList from "../Components/TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => {
      const updatedTasks = [...prev, task];

      // Setup the reminder here using the new task reference
      const delay = new Date(task.reminderTime).getTime() - Date.now();
      if (delay > 0) {
        setTimeout(() => {
          const stillExists = updatedTasks.find((t) => t.id === task.id);
          if (stillExists && !stillExists.done) {
            alert(`⏰ Reminder: ${stillExists.text}`);
          }
        }, delay);
      }

      return updatedTasks;
    });
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newReminder) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: newText, reminderTime: newReminder }
          : task
      )
    );
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="font-bold text-2xl mb-4 text-center text-indigo-600">
        Task Manager
      </h2>
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleDone}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
};

export default Tasks;
