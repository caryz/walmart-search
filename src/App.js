import React, { Component } from 'react';
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
      recItems: null,
      errorMessage: null
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
        if (!result.items) {
          this.setState({ errorMessage:
            `Could not find "${query}". Please try searching something else 😁` });
        }
        console.log(result.items);
      })
      .catch(error => {
        console.log("query error: ", error);
        this.setState({ errorMessage: "Error: " + error.statusText });
        return Promise.resolve();
      });
  }

  handleSelection(itemId) {
    console.log("HandlingSelection");
    const lookupPromise = this.props.service
      .productLookup(itemId)
      .then(result => {
        this.setState({ selectedItem: result });
      })
      .catch(error => {
        console.log("Lookup error:", error);
        return Promise.resolve();
      });

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

    return Promise.all([lookupPromise, recommendationPromise]);
  }

  handleModalExit = () => {
    this.setState({ selectedItem: null, recItems: null });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.callSearch} />
        {this.state.errorMessage}
        <Results
          items={this.state.results}
          onSelection={this.handleSelection}
        />
        <Details 
          itemDetails={this.state.selectedItem}
          onModalExit={this.handleModalExit}
          recItems={this.state.recItems} />
      </div>
    );
  }
}

export default App;
