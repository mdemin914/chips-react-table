import React from "react";

export class TextInput extends React.Component {
  render() {
    const { item, column, onChange, className } = this.props;

    return (
      <input
        key={item.id + column.name}
        type="text"
        className={"form-control " + className}
        id={item.id + column.name}
        defaultValue={item[column.name.toLowerCase()]}
        onChange={onChange}
      />
    );
  }
}
