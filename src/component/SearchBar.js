import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Icon, Button, TextField } from 'material-ui';
import { AppBar, Toolbar } from 'material-ui';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {

  },
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
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={event => this.props.onSubmit(event, this.state.searchQuery)}>
        <AppBar color="default" className={classes.bar}>
          <Toolbar>
              <TextField
                id="search"
                label="Search Walmart"
                type="search"
                margin="normal"
                style={{ width: '80%' }}
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
    );
  }
}

export default withStyles(styles)(SearchBar);
