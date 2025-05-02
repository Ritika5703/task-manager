import React from "react";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";

const TaskList = ({
  filteredTasks,
  handleToggleStatus,
  handleEdit,
  handleDelete,
  getPriorityVariant,
}) => {
  return (
    <Row>
      {filteredTasks.map((task, index) => (
        <Col md={6} lg={4} key={index} className="mb-3">
          <Card
            border={task.status === "Completed" ? "success" : "secondary"}
            className="shadow-sm"
          >
            <Card.Body>
              <Card.Title className="d-flex justify-content-between">
                {task.text}
                <Badge bg={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              </Card.Title>
              {task.reminder && (
                <Card.Text className="text-muted">
                  ⏰ Reminder: {new Date(task.reminder).toLocaleString()}
                </Card.Text>
              )}
              {task.dueDate && (
                <Card.Text className="text-muted">
                  📅 Due: {new Date(task.dueDate).toLocaleString()}
                </Card.Text>
              )}
              <div className="d-flex justify-content-between mt-3">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleToggleStatus(index)}
                >
                  {task.status === "Pending" ? "Done" : "Undo"}
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted text-center small">
              {task.status} • Created:{" "}
              {new Date(task.createdAt).toLocaleString()}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
