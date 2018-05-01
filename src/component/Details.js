import React, { Component } from 'react';
import { Button, Paper } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Recommended from './layout/Recommended';
import "./../App.css";

const styles = {
  paper: {
    paddingRight: 10,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
  }
};

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
    return (
      <div>
        <DialogTitle id="responsive-dialog-title">{itemDetails.name}</DialogTitle>
        <DialogContent>
          <Paper style={styles.paper} elevation={4}>
            <img className="left-aligned" src={itemDetails.mediumImage}
              alt={itemDetails.mediumImage} />
            <DialogContentText className="detail-heading-text">
                MSRP: <b>${itemDetails.msrp}</b><br />
                Price: <b>${itemDetails.salePrice}</b><br />
                Rating: <img src={itemDetails.customerRatingImage}
                          alt={itemDetails.customerRating} /><br />
                Color: <b>{itemDetails.color}</b><br />
                Brand Name: <b>{itemDetails.brandName}</b><br />
                Stock: <b>{itemDetails.stock}</b>
            </DialogContentText>
            <div style={{ clear: 'both' }}></div>
          </Paper>
          <h4>Details</h4>
          <DialogContentText>
            {itemDetails.shortDescription}
          </DialogContentText>
        </DialogContent>
        <Recommended items={this.buildRecommendedItems()} />
      </div>
    );
  }

  buildRecommendedItems() {
    const recItems = this.props.recItems;
    if (!recItems) { return [] }
    let data = [];
    recItems.map((item, index, recItems) => {
      data.push({
        title: item.name,
        img: item.mediumImage,
        price: "$" + item.salePrice,
      });
      return null;
    });
    return data;
  }

  // Dialog Modals
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onModalExit();
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props; // for responsive modal
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={!this.state.open && this.props.itemDetails != null}
          onClose={this.handleClose}>
          {this.buildDetails()}

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(Details);
