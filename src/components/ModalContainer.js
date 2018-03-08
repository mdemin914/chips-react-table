import { connect } from "react-redux";

import { ChipsModal } from "./Modal.js";
import {
  saveIconClick,
  onFieldChangeAction,
  toggleModal
} from "../actions/actions.js";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveIconClick: item => {
      dispatch(saveIconClick(item));
    },
    onFieldChange: (item, column, value, items) => {
      dispatch(onFieldChangeAction(item, column, value, items));
    },
    toggleModal: () => {
      dispatch(toggleModal());
    }
  };
};

export const ChipsModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChipsModal
);
