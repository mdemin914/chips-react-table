# Table for editing lists of items React and Bootstrap v4

* WIP
* Features:
  * Provide items get a table that can
    * show items with the provided columns
      * specify name and width
    * allow user to edit the items provided in the props
    * edit modes:
      * inline
        * upon edit icon click, the row changes to inputs
        * upon save icon click, calls the callback for save with the edited item
        * upon delete icon click, calls the callback for delete with that item
      * modal
        * upon edit icon click, a modal popup with the item popups
        * upon save click, calls the callback for save with the edited item and close modal
        * upon delete icon click, calls the callback for delete with that item
      * inline-modal
        * has modal features and
        * upon double click, item column allows editing that field
        * on blur it calls the calls the callback for save with the edited item
        * note: in this mode may need to bind the hideFieldInput method to the body so that the input correctly goes away after the double click
* Todo
  * Sort
  * More config
    * Show / Hide actions (read only table), edit mode "none"
    * CSS

## React PropTypes

```
Table.propTypes = {
  // specify the edit mode - inline / modal / none
  editMode: PropTypes.oneOf(["inline", "modal", "inline-modal"])
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
```

## React Table with stuff

* demo uses bootstrap v4 and some custom css
* open console to see callbacks for save and delete
* https://codesandbox.io/s/github/mdemin914/chips-react-table
