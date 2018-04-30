import React, { Component } from 'react';

export class Details extends Component {
  constructor(props) {
    super(props);

    this.buildDetails = this.buildDetails.bind(this);
    this.buildRecommendedItems = this.buildRecommendedItems.bind(this);
  }

  buildDetails() {
    const itemDetails = this.props.itemDetails
    if (!itemDetails) { return }
    console.log("Item Details");
    console.log(itemDetails);
    return (
      <div background-color="yellow">
        {itemDetails.name} | {itemDetails.salePrice}
        <img src={itemDetails.mediumImage} />
      </div>
    );
  }

  buildRecommendedItems() {
    const recItems = this.props.recItems;
    if (!recItems) { return }
    console.log("Recommended");
    console.log(recItems);

    return recItems.map((item, index, recItems) => { return (
      <li key={index}>{item.name}</li>
    )});
  }

  render() {
    return (
      <div>
        <h2>Details</h2>
        {this.buildDetails()}
        <h2>Recommended</h2>
        <ul>
          {this.buildRecommendedItems()}
        </ul>
      </div>
    );
  }
}

export default Details;
