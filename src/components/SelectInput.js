import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

export class SelectInput extends React.Component {
  render() {
    const { item, column } = this.props;

    const handleChange = selectedOption => {
      if (!selectedOption) {
        return;
      }
      this.props.onChange(item, column, selectedOption.value);
    };

    const options = column.options.map(o => {
      return { value: o, label: o };
    });

    return (
      <Select
        className=""
        name="form-field-name"
        value={item[column.name.toLowerCase()]}
        onChange={handleChange}
        options={options}
      />
    );
  }
}
