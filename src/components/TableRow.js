import React from "react";
import PropTypes from "prop-types";
// import shortid from "shortid";
import { TextInput } from "./TextInput.js";
import { SelectInput } from "./SelectInput.js";
// import { showInputField, saveIconClick } from "../actions/actions";

export class TableRow extends React.Component {
  // render output row, with an action handler in the case of inline modal
  outputColumn(item, column) {
    const { tableStyles, showInputField, editMode } = this.props;

    let action = null;
    if (editMode === "inline-modal") {
      action = e => {
        showInputField(item, column.name.toLowerCase());
      };
    }

    return (
      <td
        id={item.id + column.name}
        width={column.width}
        className={tableStyles.itemtd}
        key={"output-column" + item.id + column.name}
        onDoubleClick={action}>
        <div id={item.id + column.name} className="truncate">
          {item[column.name.toLowerCase()]}
        </div>
      </td>
    );
  }

  // render inline inputs when the edit icon has been cliked and mode in inline
  inlineColumn(item, column) {
    const { onFieldChange, tableStyles, items } = this.props;

    const onChange = e => {
      onFieldChange(item, column, e.target.value, items);
    };

    let input = null;

    if (column.type === "text") {
      input = (
        <TextInput
          item={item}
          column={column}
          onChange={onChange}
          items={items}
          className={tableStyles.input}
        />
      );
    } else if (column.type === "select") {
      input = (
        <SelectInput
          item={item}
          column={column}
          onChange={onFieldChange}
          className={tableStyles.input}
        />
      );
    } else if (column.type === "date") {
    }

    return (
      <td
        id={item.id + column.name}
        width={column.width}
        className={tableStyles.itemtd}
        key={"inline-column-td" + item.id + column.name}>
        {input}
      </td>
    );
  }

  // render single input field on the field that has been double clicked
  inlineModalColumn(item, column) {
    const { onFieldChange, tableStyles, items } = this.props;

    const onChange = e => {
      onFieldChange(item, column, e.target.value, items);
    };

    let input = null;

    if (column.type === "text") {
      input = (
        <TextInput
          item={item}
          column={column}
          onChange={onChange}
          className={tableStyles.input}
        />
      );
    } else if (column.type === "select") {
      input = (
        <SelectInput
          item={item}
          column={column}
          onChange={onFieldChange}
          items={items}
          className={tableStyles.input}
        />
      );
    } else if (column.type === "date") {
    }
    return (
      <td
        id={item.id + column.name}
        width={column.width}
        className={tableStyles.itemtd}
        key={"inline-modal-column-td" + item.id + column.name}>
        {input}
      </td>
    );
  }

  // render the correct column based on the edit mode and state
  column(item, column) {
    const {
      itemIdsBeingEditedSet,
      itemBeingEdited,
      itemFieldBeingEdited,
      editMode
    } = this.props;

    if (editMode === "inline" && itemIdsBeingEditedSet.has(item.id)) {
      // render inline inputs when the edit icon has been cliked and mode in inline
      return this.inlineColumn(item, column);
    } else if (
      editMode === "inline-modal" &&
      itemBeingEdited &&
      item.id === itemBeingEdited.id &&
      column.name.toLowerCase() === itemFieldBeingEdited
    ) {
      // render single input field on the field that has been double clicked
      return this.inlineModalColumn(item, column);
    } else {
      // render output row, with an action handle in the case of inline modal
      return this.outputColumn(item, column);
    }
  }

  // render the columns with actions
  actionsColumn(item) {
    const {
      saveClick,
      editClick,
      deleteClick,
      tableStyles,
      editMode,
      itemIdsBeingEditedSet
    } = this.props;

    const editItemClick = e => {
      editClick(item);
      // this.editIconClick(item);
    };

    const deleteItemClick = e => {
      deleteClick(item);
    };

    const saveItemClick = e => {
      saveClick(item);
    };

    let actions = [
      <div key={item.id} className="col-sm-4 table-remove-icon">
        <img
          alt="delete"
          src={tableStyles.removeIcon}
          width="20px"
          height="20px"
          onClick={deleteItemClick}
        />
      </div>
    ];

    if (itemIdsBeingEditedSet.has(item.id) && editMode === "inline") {
      actions.unshift(
        <div
          key={"save-icon" + item.id}
          className="col-sm-4 offset-sm-1 table-edit-icon">
          <img
            alt="save"
            src={tableStyles.saveIcon}
            width="20px"
            height="20px"
            onClick={saveItemClick}
          />
        </div>
      );
    } else {
      actions.unshift(
        <div
          key={"edit-icon" + item.id}
          className="col-sm-4 offset-sm-1 table-edit-icon">
          <img
            alt="edit"
            src={tableStyles.editIcon}
            width="20px"
            height="20px"
            onClick={editItemClick}
          />
        </div>
      );
    }

    return (
      <td key={"actions-column" + item.id} width="10%">
        <div className="row">{actions}</div>
      </td>
    );
  }

  render() {
    const { item, columns } = this.props;

    const tableColumns = columns.map(c => {
      return this.column(item, c);
    });

    // tableColumns.unshift(this.actionsColumn(item));

    return (
      <tr key={"table-row" + item.id}>
        {this.actionsColumn(item)}
        {tableColumns}
      </tr>
    );
  }
}

TableRow.propTypes = {
  editMode: PropTypes.string,
  item: PropTypes.object,
  state: PropTypes.object
};
