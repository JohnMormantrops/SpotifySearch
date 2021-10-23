import React, { Component } from "react";
import "./styles.css";
import { spotifyArray } from "./spotify.js";
import cs385spotify from "../images/cs385spotify.png";
// We now have our own reference to the addressBook array
// from external Javascript file

const localSpotifyArray = spotifyArray;

console.log(localSpotifyArray);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", globalArray: localSpotifyArray };
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  } // end constructor
  /** This is the method called when the search form box changes **/
  /** Javascript will create an event object for you **/

  handleDeleteButtonClick() {
    console.log("HOIUVOUYFUY");
    //this.setState({ searchTerm: "" });
  }

  onSearchFormChange(event) {
    // We re-assign the state variable called searchTerm
    // event is understood by Javascript to be a change to a UI item
    this.setState({ searchTerm: event.target.value });
  }
  render() {
    return (
      <div className="App">
        <img src={cs385spotify} alt="spotify logo" />
        <h1>Spotify Search App</h1>

        <SearchForm
          buttonHandler={this.handleDeleteButtonClick}
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
        />
        <SearchResults
          searchTerm={this.state.searchTerm}
          globalArray={this.state.globalArray}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

/** We use this component to display or render the results of search**/
class SearchResults extends Component {
  // we need to write a filter function to perform our search
  // we will need to check the name and company and phone number
  // searchTerm is what is provided to us by the user in the text box
  arrayFilterFunction(searchTerm) {
    return function (spotifyObject) {
      // convert everything to lower case for string matching
      let artist = spotifyObject.artist.toUpperCase();
      let topgenre = spotifyObject.topgenre.toUpperCase();
      let title = spotifyObject.title.toUpperCase();
      // no need to lower case numbers
      // we also check if the searchTerm is just blank space
      return (
        searchTerm !== "" &&
        (artist.includes(searchTerm.toUpperCase()) ||
          topgenre.includes(searchTerm.toUpperCase()) ||
          title.includes(searchTerm.toUpperCase()))
      );
    };
  }

  render() {
    const arrayPassedAsParameter = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;

    // let's calculate how many elements or obejcts are
    // in the array after the filter is applied.

    return (
      <div className="SearchResultsDisplay">
        <hr className="hr" />
        <h2>Search For:</h2>
        <h2>{searchTermFromProps}</h2>
        <hr className="hr" />
        <h1>Search Results</h1>
        <hr className="hr" />
        {console.log(Array.isArray(arrayPassedAsParameter))}
        {console.log(searchTermFromProps)}
        {arrayPassedAsParameter
          .filter(this.arrayFilterFunction(searchTermFromProps))
          .map((a) => (
            <div key={a.id}>
              <table border="" className="table">
                <thead className="evenRow">
                  <tr>
                    <u>{a.artist}</u>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{a.title}</td>
                  </tr>
                  <tr className="evenRow">
                    <td>{a.topgenre}</td>
                  </tr>
                  <tr>
                    <td>{a.year}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}
      </div>
    );
  }
} // close the SearchResults component

class SearchForm extends Component {
  render() {
    // this.props are the properties which are provided or passed
    // to this component. We have the searchTerm and we have the
    // onChange function.
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    const buttonHandler = this.props.buttonHandler;

    return (
      <div className="SearchFormForm">
        <hr className="hr" />
        <form>
          <b>search: </b>
          <input
            type="text"
            value={searchTermFromProps}
            onChange={onChangeFromProps}
          />
          <button className="btn" onClick={buttonHandler}>
            <b>delete</b>
          </button>
        </form>
        <hr className="hr" />
      </div>
    );
  }
} // close the SearchForm Component

export default App;
