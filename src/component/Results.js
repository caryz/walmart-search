import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Typography } from 'material-ui';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: 80,
    padding: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  money: {
    color: '#002654',
  },
  pointer: {
    cursor: 'pointer'
  }
});

export class Results extends Component {
  constructor(props) {
    super(props);
    this.getResults = this.getResults.bind(this);
  }

  getResults() {
    const items = this.props.items;
    if (!items) { return }
    const { classes } = this.props;

    return items.map((item, index, items) => { return (
      <Grid item md={3} key={index} style={{ maxWidth: "100%" }}>
        <Paper className={classes.paper}
          key={index} elevation={4}>
          <img src={item.mediumImage} alt={item.mediumImage}
            className={classes.pointer}
            onClick={() => this.props.onSelection(item.itemId)}/> <br />
          <Typography variant="title" className={classes.money}>
          ${item.salePrice}
          </Typography>
          <Typography variant="body1" className={classes.pointer}
            onClick={() => this.props.onSelection(item.itemId)}>
            {item.name}
          </Typography>
          <img src={item.customerRatingImage} alt={item.customerRating} />
        </Paper>
      </Grid>
    )});
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container} spacing={24} direction="row">
        {this.getResults()}
      </Grid>
    );
  }
}

export default withStyles(styles)(Results);
