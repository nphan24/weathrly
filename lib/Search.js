import React, { Component } from 'react';
import './styles/Search.scss';
import Trie from '../node_modules/@stevenleelawson/complete-me/lib/Trie.js';
import cityStates from './cityStates.js';
import PropTypes from 'prop-types';
const warnIcon = require('./assets/warning.svg');

const trie = new Trie();

trie.populate(cityStates.data);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      location: '',
      suggestions: []
    };
    this.changeSearchState = this.changeSearchState.bind(this);
  }

  changeSearchState(event) {
    this.setState({ input: event.target.value, location: event.target.value});
    if (event.target.value.length > 2) {
      this.setState({
        suggestions: trie.suggest(event.target.value)
      });
    }
  }

  render () {
    return (
      <form className="input-form">
        <input className="search-bar"
          list="suggestions"
          type="search"
          placeholder="Enter City/Zip here"
          value={this.state.input}
          onChange={(event) => this.changeSearchState(event)}
        />
        <datalist className="complete" id="suggestions">
          {

            this.state.suggestions.map( (suggestion, index) => {
              if (index < 5) {
                return <option value={suggestion} key={index}/>;
              }
            })
          }
        </datalist>
        <button className='submit-button'
          onClick={(event) => {
            event.preventDefault();
            this.props.handleSearch(this.state.location);
          }}>
          submit
        </button>
        {
          this.props.error &&
          <p className='error'>
            <img className="warnIcon" src={warnIcon} alt="taco" />
            Please enter a valid location</p>
        }
      </form>
    );
  }
}


export default Search;

Search.propTypes = {
  handleSearch: PropTypes.func,
  error: PropTypes.bool
};
