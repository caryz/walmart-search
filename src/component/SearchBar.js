import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Icon, Button, TextField } from 'material-ui';
import { AppBar, Toolbar, Typography } from 'material-ui';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
    console.log('SearchQuery: ' + this.state.searchQuery);
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={event => this.props.onSubmit(event, this.state.searchQuery)}>
        <AppBar position="static" color="default">
          <Toolbar>
              <TextField
                id="search"
                label="Search Walmart"
                type="search"
                margin="normal"
                style={{ width: '75%' }}
                type="text" 
                value={this.state.searchQuery}
                onChange={this.handleChange}
                    onSubmit={event => this.props.onSubmit(event, this.state.searchQuery)}
              />
              <Button className={classes.button} variant="raised" color="primary"
                type="submit" value="Submit">
                Search
                <Icon className={classes.rightIcon}>search</Icon>
              </Button>
            </Toolbar>
        </AppBar>
      </form>
      // <form onSubmit={event => this.props.onSubmit(event, this.state.searchQuery)}>
      //   <label>
      //     Search:
      //     <input type="text" value={this.state.searchQuery}
      //      onChange={this.handleChange} />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
    );
  }
}

export default withStyles(styles)(SearchBar);
