export const SAVE_ICON_CLICK = "SAVE_ICON_CLICK";
export const EDIT_ICON_CLICK = "EDIT_ICON_CLICK";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const HIDE_INPUT_FIELD = "HIDE_INPUT_FIELD";
export const SHOW_INPUT_FIELD = "SHOW_INPUT_FIELD";
export const ON_FIELD_CHANGE = "ON_FIELD_CHANGE";

export const saveIconClick = item => ({
  item,
  type: SAVE_ICON_CLICK
});

export const editIconClick = item => ({
  item,
  type: EDIT_ICON_CLICK
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL
});

export const hideInputField = e => ({
  e,
  type: HIDE_INPUT_FIELD
});

export const showInputField = (item, field) => ({
  item,
  field,
  type: SHOW_INPUT_FIELD
});

export const onFieldChangeAction = (item, column, value, items) => ({
  item,
  column,
  value,
  items,
  type: ON_FIELD_CHANGE
});
