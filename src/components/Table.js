import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
// import thunkMiddleware from "redux-thunk";
import { reducer } from "../reducers/reducer";

// import shortid from "shortid";
import PropTypes from "prop-types";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ColumnHeaders } from "./ColumnHeaders";
import { TableRowContainer } from "./TableRowContainer";
import { ChipsModalContainer } from "./ModalContainer";

import { saveIconClick, hideInputField } from "../actions/actions";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(reducer, applyMiddleware(thunk, createLogger()));
    this.state = this.store.getState();
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => this.forceUpdate());
  }

  renderTable() {
    const state = this.store.getState();

    const {
      columns,
      items,
      tableStyles,
      saveItemAction,
      deleteItemAction,
      editMode
    } = this.props;

    const tableRows = items.map(i => {
      return (
        <TableRowContainer
          key={i.id}
          item={i}
          columns={columns}
          tableStyles={tableStyles}
          saveItemAction={saveItemAction}
          deleteItemAction={deleteItemAction}
          editMode={editMode}
          items={items}
        />
      );
    });

    let action = null;

    const hideFieldInput = e => {
      if (
        state.itemBeingEdited &&
        e.target.id.toLowerCase() !==
          state.itemBeingEdited.id + state.itemFieldBeingEdited &&
        editMode === "inline-modal"
      ) {
        this.store.dispatch(hideInputField(e));
      }
    };

    if (state.itemBeingEdited) {
      action = hideFieldInput;
    }

    return (
      <div onClick={action}>
        {this.renderModal()}
        <table className={tableStyles.table}>
          <thead className={tableStyles.thead}>
            <tr>
              <th width="10%">Actions</th>
              <ColumnHeaders columns={columns} />
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        {JSON.stringify(state)}
      </div>
    );
  }

  renderModal() {
    const state = this.store.getState();

    const item = this.props.items
      .filter(i => {
        return state.itemBeingEdited && i.id === state.itemBeingEdited.id;
      })
      .pop();

    if (
      (this.props.editMode === "modal" ||
        this.props.editMode === "inline-modal") &&
      state.showModal
    ) {
      const saveItemClick = e => {
        this.props.saveItemAction(item);
        this.store.dispatch(saveIconClick(item));
      };

      return (
        <ChipsModalContainer
          showModal={state.showModal}
          item={item}
          columns={this.props.columns}
          saveItemClick={saveItemClick}
          onFieldChange={this.onFieldChange}
          items={this.props.items}
        />
      );
    }
    return null;
  }

  render() {
    return <Provider store={this.store}>{this.renderTable()}</Provider>;
  }
  // editIconClick(item) {
  //   this.store.dispatch(editIconClick(item));
  // }

  // onFieldDoubleClick(item, field, target) {
  // const newState = Object.assign({}, this.state);
  // newState.itemBeingEdited = item;
  // newState.itemFieldBeingEdited = field;
  // // newState.itemBeingEditedTarget = target;
  // this.setState(newState);
  // }

  // onFieldChange(item, field, val) {
  //   for (let i of this.props.items) {
  //     if (item.id === i.id) {
  //       i[field.name.toLowerCase()] = val;
  //     }
  //   }
  // }

  // hideFieldInput(e) {
  //   if (
  //     e.target.id.toLowerCase() !==
  //     this.state.itemBeingEdited.id + this.state.itemFieldBeingEdited
  //   ) {
  //     const newState = Object.assign({}, this.state);
  //     newState.itemBeingEdited = null;
  //     newState.itemFieldBeingEdited = null;
  //     this.setState(newState);
  //   }
  // }

  /*
  outputRow(columns, item, editIconClick, deleteIconClick) {
    let { saveItemAction, deleteItemAction } = this.props;

    const tableColumns = columns.map(c => {
      return this.itemColumn(item, c);
    });

    return (
      <tr className={this.props.tableStyles.tbodyrow} key={item.id}>
        {this.actionsColumn(
          item,
          editIconClick,
          deleteItemAction,
          saveItemAction
        )}
        {tableColumns}
      </tr>
    );
  }

  actionsColumn(item, editIconClick, deleteItemAction, saveItemAction) {
    const state = this.store.getState();

    const editItemClick = e => {
      this.editIconClick(item);
    };

    const deleteItemClick = e => {
      deleteItemAction(item);
    };

    const saveItemClick = e => {
      saveItemAction(item);
      this.store.dispatch(saveIconClick(item));
    };

    if (
      state.itemIdsBeingEditedSet.has(item.id) &&
      this.props.editMode === "inline"
    ) {
      return (
        <td width="10%">
          <div className="row">
            <div className="col-sm-4 offset-sm-1 table-edit-icon">
              <img
                alt="save"
                src={this.props.tableStyles.saveIcon}
                width="20px"
                height="20px"
                onClick={saveItemClick}
              />
            </div>
            <div className="col-sm-4 table-remove-icon">
              <img
                alt="delete"
                src={this.props.tableStyles.removeIcon}
                width="20px"
                height="20px"
                onClick={deleteItemAction}
              />
            </div>
          </div>
        </td>
      );
    } else {
      return (
        <td width="10%">
          <div className="row">
            <div className="col-sm-4 offset-sm-1 table-edit-icon">
              <img
                alt="edit"
                src={this.props.tableStyles.editIcon}
                width="20px"
                height="20px"
                onClick={editItemClick}
              />
            </div>
            <div className="col-sm-4 table-remove-icon">
              <img
                alt="delete"
                src={this.props.tableStyles.removeIcon}
                width="20px"
                height="20px"
                onClick={deleteItemClick}
              />
            </div>
          </div>
        </td>
      );
    }
  }

  itemColumn(item, column) {
    const state = this.store.getState();

    const onFieldChange = e => {
      this.onFieldChange(item, column, e.target.value);
    };
    // inline
    if (
      state.itemIdsBeingEditedSet.has(item.id) &&
      this.props.editMode === "inline"
    ) {
      return (
        <td
          id={item.id + column.name}
          width={column.width}
          className={this.props.tableStyles.itemtd}
          key={shortid.generate()}>
          <input
            id={item.id + column.name}
            className={this.props.tableStyles.input}
            type="text"
            defaultValue={item[column.name.toLowerCase()]}
            onChange={onFieldChange}
          />
        </td>
      );
      // inline-modal
    } else if (
      this.props.editMode === "inline-modal" &&
      state.itemBeingEdited &&
      item.id === state.itemBeingEdited.id &&
      column.name.toLowerCase() === state.itemFieldBeingEdited
    ) {
      const saveItemClick = e => {
        this.props.saveItemAction(item);
        this.store.dispatch(saveIconClick(item));
      };

      return (
        <td
          id={item.id + column.name}
          width={column.width}
          className={this.props.tableStyles.itemtd}
          key={shortid.generate()}>
          <input
            id={item.id + column.name}
            className={this.props.tableStyles.input}
            type="text"
            defaultValue={item[column.name.toLowerCase()]}
            onChange={onFieldChange}
            onBlur={saveItemClick}
          />
        </td>
      );
      // other modes
    } else {
      let action = null;

      if (this.props.editMode === "inline-modal") {
        action = e => {
          // this.onFieldDoubleClick(item, column.name.toLowerCase(), e.target);
          this.store.dispatch(showInputField(item, column.name.toLowerCase()));
        };
      }

      return (
        <td
          id={item.id + column.name}
          width={column.width}
          className={this.props.tableStyles.itemtd}
          key={shortid.generate()}
          onDoubleClick={action}>
          <div id={item.id + column.name} className="truncate">
            {item[column.name.toLowerCase()]}
          </div>
        </td>
      );
    }
  }
*/
}

Table.contextTypes = { store: PropTypes.object };
// Provider.childContextTypes = {
//   store: PropTypes.object
// };

Table.defaultProps = {
  columns: [],
  items: [],
  tableStyles: {
    table: "table table-stripped",
    tableHeader: "",
    tableRow: "",
    itemtd: ""
  }
};

Table.propTypes = {
  // specify the edit mode - inline / modal / none
  editMode: PropTypes.oneOf(["inline", "modal", "none", "inline-modal"])
    .isRequired,
  // specify columns name and width
  // the lower case column name will be used as a key for the item
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      width: PropTypes.string
    })
  ),
  // list of items to display
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  // edit icon shown in actions
  editIcon: PropTypes.string,
  // delete icon shown in actions
  deleteIcon: PropTypes.string,
  // when delete is clicked this is called
  // returns the item to be deleted
  deleteItemAction: PropTypes.func.isRequired,
  // save icon shown in actions
  saveIcon: PropTypes.string,
  // when save is clicked this is called
  // returns the item that has been edited
  saveItemAction: PropTypes.func.isRequired,
  // table stuff
  tableStyles: PropTypes.shape({
    table: PropTypes.string,
    tableHeader: PropTypes.string,
    tableRow: PropTypes.string
  })
};

export default Table;
