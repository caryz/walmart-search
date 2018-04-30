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
      recItems: null
    };
    App.defaultProps = {
      adsf: null
    };

    this.callSearch = this.callSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  callSearch(event, query) {
    event.preventDefault();
    console.log("Query: " + query);
    if (!query) { return }

    return this.props.service
      .search(query)
      .then(result => {
        this.setState({ results: result.items });
        console.log(result.items);
      })
  }

  handleSelection(itemId) {
    console.log("HandlingSelection");
    const recommendationPromise = this.props.service
      .recommendations(itemId)
      .then(result => {
        // successful response without recommendations:
        // {"errors":[{"code":4022,"message":"No recommendations found for item 49802799"}]}
        if (result.errors) {
          this.setState({ recItems: null });
          return Promise.reject(result.errors);
        }
        this.setState({ recItems: result });
      })
      .catch(error => {
        console.log("Recommendation error: ", error);
        return Promise.resolve();
      });

    const lookupPromise = this.props.service
      .productLookup(itemId)
      .then(result => {
        this.setState({ selectedItem: result });
      })
      .catch(error => {
        console.log("Lookup error:", error);
        return Promise.resolve();
      });

    return Promise.all([recommendationPromise, lookupPromise]);
  }

  render() {
    // const stringProps = JSON.stringify(this.props);
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
          onSelection={this.handleSelection}
        />
        <Details itemDetails={this.state.selectedItem}
          recItems={this.state.recItems} />
      </div>
    );
  }
}

export default App;
