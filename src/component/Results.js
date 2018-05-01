import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Paper, Grid } from 'material-ui';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    padding: theme.spacing.unit * 2,
    'background-color': 'red',
    width: '100%',
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
    console.log("getResults");
    const { classes } = this.props;

    return items.map((item, index, items) => { return (
      /*
      <li key={index} 
         onClick={() => this.props.onSelection(item.itemId)}>
        <img src= {item.thumbnailImage} width='30' />
        {item.name} | ${item.salePrice}
      </li>
      */
      <Grid item md={3} key={index}>
        <Paper className={classes.paper} 
          key={index} onClick={() => this.props.onSelection(item.itemId)}>
          <img src={item.thumbnailImage} width='80%' /> <br/>
          {item.name} | ${item.salePrice}
        </Paper>
      </Grid>
    )});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={24} direction='row'>
          {this.getResults()}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Results);
