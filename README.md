### Walmart Search

### Install & Run

1. Install Node and clone this repo
2. Navigate to project directory in terminal, then run `npm i`
3. Run `npm start`. If your browser does not automatically display the page, visit http://localhost:3000/

### Project Details

#### Frameworks
* [ReactJS](https://reactjs.org/) for doing things the React way and underlying project structure
* [Material-UI Next](https://material-ui-next.com/) for front-end UI components

#### Summary
React is all about utilizing components, so the app utilizes the following components:

* `WalmartService`: Utility class for generating and making API calls
* `SearchBar`: Handles user input and propagates this back to `App` the search call
* `Result`: Grid layout view of the search results, rendered in tile form
* `Details`: Handles building and displaying a modal to show item details and its recommended items
  * `Recommended`: Side-scrolling grid layout of recommended items in relation to the currently selected item
* `App`: Default main file and entry point, and encapsulates the other components
