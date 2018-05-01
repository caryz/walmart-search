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
      showModal: false,
      recItems: null,
      messaging: null
    };
    this.callSearch = this.callSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  callSearch(event, query) {
    event.preventDefault();
    if (!query) { return }
    this.setState({messaging: "Loading..."})

    return this.props.service
      .search(query)
      .then(result => {
        this.setState({ results: result.items });
        this.setState({ messaging: null })
        if (!result.items) {
          this.setState({ messaging:
            `Could not find "${query}". Please try searching something else 😁` });
        }
      })
      .catch(error => {
        console.log("query error: ", error);
        this.setState({ messaging: "Error: " + error.statusText });
        return Promise.resolve();
      });
  }

  handleSelection(itemId) {
    console.log("HandlingSelection");
    this.setState({ showModal: true });
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
    this.setState({ selectedItem: null, recItems: null, showModal: false });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.callSearch} />
        <div className="messaging-text">
          {this.state.messaging}
        </div>
        <Results
          items={this.state.results}
          onSelection={this.handleSelection}
        />
        <Details
          showModal={this.state.showModal}
          itemDetails={this.state.selectedItem}
          onModalExit={this.handleModalExit}
          recItems={this.state.recItems} />
      </div>
    );
  }
}

export default App;
