import React, { Component } from 'react';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.getResults = this.getResults.bind(this);
  }

  getResults() {
    const items = this.props.items;
    if (items != null) {
      let tags = [];
      console.log("getResults: ");
      return items.map((item, index, items) => {
        return (
          <li key={index}>
            <img src= {item.thumbnailImage} width='30' />
            {item.name} | ${item.salePrice}
          </li>
        )
      });
    }
  }

  render() {
    return (
      <ul>
        {this.getResults()}
      </ul>
    );
  }
}

export default Results;
