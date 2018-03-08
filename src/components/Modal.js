import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ChipsModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.toggleModal}>
          <ModalHeader toggle={this.props.toggleModal}>
            {this.props.item.name}
          </ModalHeader>
          <ModalBody>{this.modalItemBody(this.props.item)}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.saveItemClick}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  modalItemBody(item) {
    return this.props.columns.map(c => {
      const onChange = e => {
        // e.preventDefault();
        this.props.onFieldChange(item, c, e.target.value, this.props.items);
      };

      return (
        <div key={item.id + c.name} className="form-group">
          <label htmlFor={item.id}>{c.name}</label>
          <input
            key={item.id + c.name}
            type="text"
            className="form-control"
            id={item.id + c.name}
            defaultValue={item[c.name.toLowerCase()]}
            onChange={onChange}
          />
        </div>
      );
    });
  }
}
