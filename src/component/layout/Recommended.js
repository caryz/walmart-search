import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Typography, Paper } from 'material-ui';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#fff',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    margin: 10,
  }
});

export class Recommended extends Component {
  render() {
    const { classes } = this.props;
    const itemList = this.props.items;
    let display = (
      itemList.map((tile, index, itemList) => (
        <Paper className={classes.paper} elevation={8} key={index}>
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={tile.price}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        </Paper>
      ))
    );

    if (!itemList || itemList.length === 0) { return (
      <div className={classes.root}>
        <Typography variant="display1" style={{ align: "left" }}>
          No Recommended Items :(
        </Typography>
      </div>
    )}
    return (
      <div className={classes.root}>
        <Typography variant="headline" style={{align: "left"}}>
          Sponsored Products
        </Typography>
        <GridList className={classes.gridList} cols={2.5}>
          {display}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Recommended);
