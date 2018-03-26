/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Paragraph,
  Title,
} from 'react';

import {
  resetPasswordRequest,
} from '../actions';
import genericStyles from './Generic.css';

/**
 * Account page
 *
 */
export class AccountComponent extends React.Component {
  props: {
    auth     : Object,
    dispatch : Function,
  };

  state: {
    success: ?boolean,
  };

  static propTypes = {
    auth     : React.PropTypes.object.isRequired,
    dispatch : React.PropTypes.func.isRequired,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      success: null,
    };
  }

  /**
   * Handle onClick
   * @param {Event} evt
   * @private
   * @return {function}
   */
  handleClick = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();
    this.props.dispatch(resetPasswordRequest({
      email     : this.props.auth.email,
      onSuccess : () : void => {
        /* eslint-disable react/no-set-state */
        this.setState({
          success: true,
        });
        /* eslint-enable react/no-set-state */
      },
    }));
  }

  render(): React.Element<*> {
    let {
      success,
    } = this.state;

    let children = [];

    if (success) {
      children.push(
        <Paragraph
          content={{id: 'account.resetPassword.success.content'}}
          key="resetPassword.success"
        />
      );
    } else {
      children.push(
        <Button
          content={{id: 'account.resetPassword.submit'}}
          key="change"
          onClick={this.handleClick}
          type="button"
        />
      );
    }
    return (
      <article>
        <header>
          <Title
            className={genericStyles.pageTitle}
            content={{id: 'account.title'}}
          />
        </header>
        <Paragraph content={{id: 'account.content'}} />
        {children}
      </article>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    auth: state.auth,
  };
}

/* istanbul ignore next */
export const Account = connect(mapStateToProps)(AccountComponent);
