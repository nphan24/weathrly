import React from 'react';
import './styles/Header.scss';
import Search from './Search';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <div className="header">
      <nav>
        {
          !props.error &&
          <p className="city-location">{props.stateLocation}</p>
        }
        <Search
          handleSearch={props.handleSearch}
          error={props.error}
        />
      </nav>
    </div>
  );
};

export default Header;

Header.propTypes = {
  stateLocation: PropTypes.string,
  handleSearch: PropTypes.func,
  error: PropTypes.bool
};
