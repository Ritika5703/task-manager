import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const TaskForm = ({
  newTask,
  setNewTask,
  priority,
  setPriority,
  reminderTime,
  setReminderTime,
  dueDate,
  setDueDate,
  handleAddTask,
  editIndex,
}) => {
  return (
    <Form className="d-flex flex-column flex-md-row gap-2 mb-4 flex-wrap">
      <Form.Control
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Form.Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </Form.Select>

      {/* Reminder and Due Date side-by-side */}
      <Row className="w-100 gx-2">
        <Col md={6}>
          <Form.Group controlId="reminder">
            <Form.Label className="small text-muted">Reminder</Form.Label>
            <Form.Control
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="dueDate">
            <Form.Label className="small text-muted">Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button onClick={handleAddTask}>
        {editIndex !== null ? "Update" : "Add"}
      </Button>
    </Form>
  );
};

export default TaskForm;
