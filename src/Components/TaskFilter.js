// TaskFilter.js
import React from "react";
import { Button } from "react-bootstrap";

const TaskFilter = ({ filter, setFilter }) => {
  return (
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
  );
};

export default TaskFilter;
