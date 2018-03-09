import React from "react";
import PropTypes from "prop-types";
import { ColumnHeaders } from "./ColumnHeaders";
import { TableRow } from "./TableRow";
import { ChipsModal } from "./Modal";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemBeingEdited: null,
      itemFieldBeingEdited: null,
      itemBeingEditedTarget: null,
      itemIdsBeingEditedSet: new Set(),
      showModal: false,
      items: this.props.items
    };

    this.saveClick = this.saveClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.toggleTodal = this.toggleTodal.bind(this);
    this.hideInputField = this.hideInputField.bind(this);
    this.showInputField = this.showInputField.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentDidMount() {
    this.setState(this.state);
  }

  saveClick(item) {
    this.props.saveItemAction(item);

    let newState = Object.assign({}, this.state);

    newState.itemIdsBeingEditedSet.delete(item.id);
    newState.itemBeingEdited = null;
    newState.showModal = false;

    this.setState(newState);
  }

  editClick(item) {
    const newState = Object.assign({}, this.state);

    if (newState.itemIdsBeingEditedSet.has(item.id)) {
      newState.itemIdsBeingEditedSet.delete(item.id);
    } else {
      newState.itemIdsBeingEditedSet.add(item.id);
    }

    newState.itemBeingEdited = item;
    newState.showModal = true;

    this.setState(newState);
  }

  deleteClick(item) {
    this.props.deleteItemAction(item);
  }

  toggleTodal(item) {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    });
  }

  hideInputField(e) {
    const { itemBeingEdited, itemFieldBeingEdited } = this.state;
    if (
      e.target.id.toLowerCase() !==
      itemBeingEdited.id + itemFieldBeingEdited
    ) {
      this.setState({
        ...this.state,
        itemBeingEdited: null,
        itemFieldBeingEdited: null
      });
    }
  }

  showInputField(item, field) {
    this.setState({
      ...this.state,
      itemBeingEdited: item,
      itemFieldBeingEdited: field
    });
  }

  onFieldChange(item, column, value) {
    const newState = Object.assign({}, this.state);

    for (let i of newState.items) {
      if (item.id === i.id) {
        i[column.name.toLowerCase()] = value;
      }
    }

    this.setState(newState);
  }

  renderModal() {
    const { itemBeingEdited, showModal } = this.state;

    const item = this.props.items
      .filter(i => {
        return itemBeingEdited && i.id === itemBeingEdited.id;
      })
      .pop();

    if (
      (this.props.editMode === "modal" ||
        this.props.editMode === "inline-modal") &&
      showModal
    ) {
      return (
        <ChipsModal
          showModal={showModal}
          item={item}
          columns={this.props.columns}
          saveClick={this.saveClick}
          toggleTodal={this.toggleTodal}
          onFieldChange={this.onFieldChange}
        />
      );
    }
    return null;
  }

  render() {
    const {
      items,
      itemBeingEdited,
      itemFieldBeingEdited,
      itemIdsBeingEditedSet
    } = this.state;

    const { columns, tableStyles, editMode } = this.props;

    const tableRows = items.map(i => {
      return (
        <TableRow
          key={i.id}
          item={i}
          columns={columns}
          tableStyles={tableStyles}
          editMode={editMode}
          items={items}
          itemBeingEdited={itemBeingEdited}
          itemFieldBeingEdited={itemFieldBeingEdited}
          itemIdsBeingEditedSet={itemIdsBeingEditedSet}
          saveClick={this.saveClick}
          deleteClick={this.deleteClick}
          editClick={this.editClick}
          onFieldChange={this.onFieldChange}
          showInputField={this.showInputField}
          toggleTodal={this.toggleTodal}
        />
      );
    });

    let action = null;

    const hideFieldInput = e => {
      if (
        !e.target.className.includes("Select") &&
        itemBeingEdited &&
        e.target.id.toLowerCase() !==
          itemBeingEdited.id + itemFieldBeingEdited &&
        editMode === "inline-modal"
      ) {
        this.hideInputField(e);
        this.saveClick(itemBeingEdited);
      }
    };

    if (itemBeingEdited) {
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
        {JSON.stringify(this.state)}
      </div>
    );
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
