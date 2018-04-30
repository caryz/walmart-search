import React, { Component } from 'react';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.getResults = this.getResults.bind(this);
  }

  getResults() {
    const items = this.props.items;
    if (!items) { return }
    console.log("getResults");

    return items.map((item, index, items) => { return (
      <li key={index} 
        onClick={() => this.props.onSelection(item.itemId)}>

        <img src= {item.thumbnailImage} width='30' />
        {item.name} | ${item.salePrice}

      </li>
    )});
  }

  render() {
    return (
      <div>
        <h2>Results</h2>
        <ul>
          {this.getResults()}
        </ul>
      </div>
    );
  }
}

export default Results;
