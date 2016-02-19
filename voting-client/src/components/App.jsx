import React from 'react';
import { ConnectionStateContainer } from './ConnectionState';
import { VotingContainer } from './Voting';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <div className="links">
          <Link to="/" className="link">Voting</Link>|
          <Link to="/results" className="link">Results</Link>|
          <Link to="/list" className="link">Entry List</Link>
        </div>
        {this.props.children}
        <ConnectionStateContainer />
      </div>
      )
  }
});
