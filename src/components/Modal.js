import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextInput } from "./TextInput.js";
import { SelectInput } from "./SelectInput";

export class ChipsModal extends React.Component {
  render() {
    const { showModal, toggleModal, item, saveClick } = this.props;

    return (
      <div>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{item.name}</ModalHeader>
          <ModalBody>{this.modalItemBody(item)}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveClick}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  dateInput(item, column) {}

  modalItemBody(item) {
    return this.props.columns.map(c => {
      const { onFieldChange } = this.props;
      const onChange = e => {
        onFieldChange(item, c, e.target.value);
      };

      let input = null;

      if (c.type === "text") {
        input = <TextInput item={item} column={c} onChange={onChange} />;
      } else if (c.type === "select") {
        input = <SelectInput item={item} column={c} onChange={onFieldChange} />;
      } else if (c.type === "date") {
      }

      return (
        <div key={item.id + c.name} className="form-group">
          <label htmlFor={item.id}>{c.name}</label>
          {input}
        </div>
      );
    });
  }
}
