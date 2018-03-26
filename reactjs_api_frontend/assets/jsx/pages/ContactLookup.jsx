/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  forInRight,
} from 'lodash';

import {
  getContact,
  removeContactResult,
} from '../actions';
import {
  GettingStarted,
  LookupView,
  LookupResult,
  type Result,
} from '../components';

/**
 * Contact lookup page
 *
 * @class
 */
export class ContactLookupComponent extends React.Component {
  props: {
    contacts : Object,
    dispatch : Function,
  };

  static propTypes = {
    contacts : React.PropTypes.object,
    dispatch : React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    contacts: {},
  };

  /* istanbul ignore next */
  handleSubmit = (value: string): void => {
    /* istanbul ignore next */
    this.props.dispatch(getContact(value));
  }

  /**
   * Handle remove click
   * @param {string} id
   * @private
   * @return {function}
   */
  handleRemoveClick = (id: string): Function => {
    let {
      dispatch,
    } = this.props;

    return (evt: SyntheticUIEvent): void => {
      dispatch(removeContactResult(id));
    };
  }

  render(): React.Element<*> {
    let result = [];

    let {
      contacts,
    } = this.props;

    forInRight(contacts, (contact: Result, contactId: string): void => {
      if (contact != null) {
        result.push(
          <LookupResult
            errorPrefix="contact"
            key={contact.id}
            onRemove={this.handleRemoveClick((contact.id))}
            result={contact}
          />
        );
      }
    });

    return (
      <div>
        <LookupView
          onSubmit={this.handleSubmit}
          placeholder={{id: 'contact.input.placeholder'}}
        >
          {result}
          <GettingStarted />
        </LookupView>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    contacts: state.contacts,
  };
}

/* istanbul ignore next */
export const ContactLookup = connect(mapStateToProps)(ContactLookupComponent);
