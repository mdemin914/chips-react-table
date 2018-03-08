import {
  SAVE_ICON_CLICK,
  EDIT_ICON_CLICK,
  TOGGLE_MODAL,
  HIDE_INPUT_FIELD,
  SHOW_INPUT_FIELD,
  ON_FIELD_CHANGE
} from "../actions/actions";

const tableState = {
  itemBeingEdited: null,
  itemFieldBeingEdited: null,
  itemBeingEditedTarget: null,
  itemIdsBeingEditedSet: new Set(),
  showModal: false
};

export const reducer = (state = tableState, action) => {
  switch (action.type) {
    case SAVE_ICON_CLICK:
      return saveIconClick(state, action);
    case EDIT_ICON_CLICK:
      return editIconClick(state, action);
    case TOGGLE_MODAL:
      return toggleModal(state);
    case HIDE_INPUT_FIELD:
      return hideInputField(state, action);
    case SHOW_INPUT_FIELD:
      return showInputField(state, action);
    case ON_FIELD_CHANGE:
      return onFieldChange(state, action);
    default:
      return state;
  }
};

const onFieldChange = (state, { item, column, value, items }) => {
  for (let i of items) {
    if (item.id === i.id) {
      i[column.name.toLowerCase()] = value;
    }
  }

  return state;
};

const hideInputField = (state, { e }) => {
  if (
    e.target.id.toLowerCase() !==
    state.itemBeingEdited.id + state.itemFieldBeingEdited
  ) {
    return {
      ...state,
      itemBeingEdited: null,
      itemFieldBeingEdited: null
    };
    // const newState = Object.assign({}, state);
    // newState.itemBeingEdited = null;
    // newState.itemFieldBeingEdited = null;
    // return newState;
  }

  return state;
};

const showInputField = (state, { item, field }) => {
  return {
    ...state,
    itemBeingEdited: item,
    itemFieldBeingEdited: field
  };
};

const toggleModal = state => {
  return {
    ...state,
    showModal: !state.showModal
  };
};

const saveIconClick = (state, { item }) => {
  let newState = Object.assign({}, state);

  newState.itemIdsBeingEditedSet.delete(item.id);
  newState.itemBeingEdited = null;
  newState.showModal = false;

  return newState;
};

const editIconClick = (state, { item }) => {
  const newState = Object.assign({}, state);

  if (newState.itemIdsBeingEditedSet.has(item.id)) {
    newState.itemIdsBeingEditedSet.delete(item.id);
  } else {
    newState.itemIdsBeingEditedSet.add(item.id);
  }

  newState.itemBeingEdited = item;
  newState.showModal = true;

  return newState;
};
