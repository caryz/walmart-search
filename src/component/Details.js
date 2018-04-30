import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Button, Modal, Typography } from 'material-ui';
import Recommended from './layout/Recommended';
import "./../App.css";

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.buildDetails = this.buildDetails.bind(this);
    this.buildRecommendedItems = this.buildRecommendedItems.bind(this);
  }

  buildDetails() {
    const itemDetails = this.props.itemDetails
    if (!itemDetails) { return }
    console.log("Item Details");
    console.log(itemDetails);
    return (
      <div>
        <Typography variant="title" id="modal-title">
          {itemDetails.name}
        </Typography>
        <Typography variant="subheading" id="simple-modal-description">
          List Price: ${itemDetails.msrp}
          Price: ${itemDetails.salePrice}
          Rating: <img src={itemDetails.customerRatingImage} /> {itemDetails.customerRating}
        </Typography>
        <img src={itemDetails.mediumImage} />
      </div>
    );
  }

  buildRecommendedItems() {
    const recItems = this.props.recItems;
    if (!recItems) { return [] }
    console.log("Recommended");
    console.log(recItems);

    let data = [];
    recItems.map((item, index, recItems) => {
      data.push({
        title: item.name,
        img: item.thumbnailImage,
        price: "$" + item.salePrice,
      });
    });
    console.log(data);
    return data;
  }

  // MODALS
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onModalExit();
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!this.state.open && this.props.itemDetails != null}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this.buildDetails()}

            <Recommended items={this.buildRecommendedItems()} />
          </div>
        </Modal>
      </div>
    );
  }
}

// export default Details;
export default withStyles(styles)(Details);
