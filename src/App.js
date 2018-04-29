import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Results from './component/Results';
import SearchBar from './component/SearchBar';
import Details from './component/Details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      selectedItem: null,
      recommendedItems: null
    };
    App.defaultProps = {
      adsf: null
    }

    this.callSearch = this.callSearch.bind(this);
  }

  callSearch(event, query) {
    event.preventDefault();
    console.log("Query: " + query);

    return this.props.service
      .search(query)
      .then(result => {
        this.setState({ results: result.items });
        console.log("Set items: " + result.items);
      })
  }

  render() {
    const stringProps = JSON.stringify(this.props);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <SearchBar onSubmit={this.callSearch}/>
        <Results
          items={this.state.results}
          onSelect={this.handleSelection}
        />
      </div>
    );
  }
}

export default App;
