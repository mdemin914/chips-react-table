import React from "react";
import shortid from "shortid";

export class ColumnHeaders extends React.Component {
  render() {
    return this.props.columns.map(c => {
      return (
        <th width={c.width} key={shortid.generate()} className="">
          <div className="float-left">{c.name}</div>
          <div className="float-left ml-1">
            <div className="arrow-up" />
            <div className="arrow-down" />
          </div>
        </th>
      );
    });
  }
}
