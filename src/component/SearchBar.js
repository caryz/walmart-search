import React, { Component } from 'react';

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
    return (
      <form onSubmit={event => this.props.onSubmit(event, this.state.searchQuery)}>
        <label>
          Search:
          <input type="text" value={this.state.searchQuery}
           onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchBar;
