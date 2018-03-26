/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Paragraph,
  Title,
} from 'react';

import genericStyles from './Generic.css';

/**
 * Get started page
 *
 * @class
 */
export class GetStartedComponent extends React.Component {
  render(): React.Element<*> {
    return (
      <div>
        <div>
          <Title
            className={genericStyles.pageTitle}
            content={{id: 'getStarted.title'}}
          />
          <Paragraph content={{id: 'getStarted.content'}} />
        </div>
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
export const GetStarted = connect(mapStateToProps)(GetStartedComponent);
