import { connect } from "react-redux";

import { TableRow } from "./TableRow.js";
import {
  saveIconClick,
  editIconClick,
  onFieldChangeAction,
  showInputField
} from "../actions/actions.js";

const mapStateToProps = state => {
  return {
    itemIdsBeingEditedSet: state.itemIdsBeingEditedSet,
    itemBeingEdited: state.itemBeingEdited,
    itemFieldBeingEdited: state.itemFieldBeingEdited
    // modal: state.global.modal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveIconClick: item => {
      dispatch(saveIconClick(item));
    },
    editIconClick: item => {
      dispatch(editIconClick(item));
    },
    onFieldChange: (item, column, value, items) => {
      dispatch(onFieldChangeAction(item, column, value, items));
    },
    showInputField: (item, column) => {
      dispatch(showInputField(item, column));
    }
  };
};

export const TableRowContainer = connect(mapStateToProps, mapDispatchToProps)(
  TableRow
);
