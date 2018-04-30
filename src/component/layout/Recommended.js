import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
});

export class Recommended extends Component {
  render() {
    const { classes } = this.props;
    const itemList = this.props.items;
    let display = (
      itemList.map(tile => (
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
      ))
    );
    if (!itemList || itemList.length == 0) { return "No Recommendations :(" }
    return (
      <div className={classes.root}>
        <h3>Recommended Items</h3>
        <GridList className={classes.gridList} cols={2.5}>
          {display}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Recommended);
