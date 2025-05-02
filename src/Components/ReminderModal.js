import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReminderModal = ({
  showReminderModal,
  setShowReminderModal,
  reminderTask,
}) => {
  return (
    <Modal
      show={showReminderModal}
      onHide={() => setShowReminderModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>🔔 Task Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>It’s time for:</p>
        <h5>{reminderTask?.text}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowReminderModal(false)}>
          Got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReminderModal;
