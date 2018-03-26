/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Link,
  Paragraph,
  Title,
} from 'react';

import styles from './ApiKey.css';
import genericStyles from '../Generic.css';

/**
 * API key page
 *
 */
export class ApiKeyComponent extends React.Component {
  props: {
    auth: Object,
  };

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
  };

  render(): React.Element<*> {
    let {
      auth,
    } = this.props;

    let contactUsContent = {
      id: 'apiKey.contactUs',
    };

    let contactUs = (
      <Link content={contactUsContent} href="mailto:support@myapp.com" />
    );

    let paragraphContent = {
      id     : 'apiKey.content',
      values : {
        contactUs,
      },
    };

    return (
      <div>
        <Title
          className={genericStyles.pageTitle}
          content={{id: 'apiKey.title'}}
        />

        <Paragraph content={paragraphContent} />

        <pre className={styles.token}>{auth.token}</pre>
      </div>
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
export const ApiKey = connect(mapStateToProps)(ApiKeyComponent);
