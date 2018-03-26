/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Link,
  Title,
} from 'react';

import {logout} from '../actions';
import genericStyles from './Generic.css';

/**
 * Logout page
 *
 * @class
 */
export class LogoutComponent extends React.Component {
  props: {
    dispatch: Function,
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  handleLogoutClick = (): void => {
    this.props.dispatch(logout());
  };

  render(): React.Element<*> {
    return (
      <div>
        <Title
          className={genericStyles.title}
          content={{id: 'logout.title'}}
        />

        <Link
          content={{id: 'logout.confirm'}}
          href="#"
          onClick={this.handleLogoutClick}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    loggedIn: state.loggedIn,
  };
}

/* istanbul ignore next */
export const Logout = connect(mapStateToProps)(LogoutComponent);
