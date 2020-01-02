import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

class NotFound extends React.Component {
  static propTypes = {
      title: PropTypes.string.isRequired,
  };

  render() {
      return (
          <div className={s.root}>
              <h1>{this.props.title}</h1>
              <p>Sorry, the page you were trying to view does not exist.</p>
          </div>
      );
  }
}

export default withStyles(s)(NotFound);
