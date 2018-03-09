import React from "react";
import { render } from "react-dom";
import Table from "./components/Table";

require("./css/App.css");

const columns = [
  { name: "Name", width: "5%", type: "text" },
  { name: "Description", width: "35%", type: "text" },
  {
    name: "Category",
    width: "10%",
    type: "select",
    options: ["Sleep Stuff", "Food Stuff", "Electronics"]
  },
  { name: "Weight", width: "5%", type: "date" }
];

// all items need a unique id
const items = [
  {
    name: "item1",
    description:
      "item1 description item 1 description item 1 description more long text",
    category: "Sleep Stuff",
    weight: 5,
    id: 1
  },
  {
    name: "item2",
    description:
      "item2 description theh asd sadasd . asdsa dsa d sd asd a sd asasdasdasdasdasdasd",
    category: "Sleep Stuff",
    weight: 10,
    id: 2
  },
  {
    name: "item3",
    description: "item3 description",
    category: "Food Stuff",
    weight: 15,
    id: 3
  },
  {
    name: "item4",
    description: "item4 description",
    category: "Food Stuff",
    weight: 20,
    id: 4
  },
  {
    name: "item5",
    description: "item5 description",
    category: "Food Stuff",
    weight: 25223,
    id: 5
  }
];

const tableStyles = {
  table: "table table-striped table-hover table-sm chips-table",
  thead: "", //thead-inverse
  tbodyrow: "chips-table-row", //table-info
  itemtd: "align-middle",
  input: "table-input",
  editIcon: "https://image.flaticon.com/icons/svg/61/61456.svg",
  removeIcon:
    "https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/close_red.png",
  saveIcon: "https://png.icons8.com/metro/1600/save.png"
};

const saveItem = item => {
  console.log("save item callback", item);
};

const deleteItem = item => {
  console.log("delete item callback", item);
};

const App = () => (
  <div>
    <Table
      editMode={"inline-modal"}
      columns={columns}
      items={items}
      tableStyles={tableStyles}
      saveItemAction={saveItem}
      deleteItemAction={deleteItem}
    />
  </div>
);

render(<App />, document.getElementById("root"));
