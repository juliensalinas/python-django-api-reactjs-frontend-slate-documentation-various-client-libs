/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  Paragraph,
  Title,
} from 'react';

import styles from './NoMatch.css';
import genericStyles from '../Generic.css';
import {
  LinkButton,
} from '../../components';

/**
 * No match page
 *
 */
export class NoMatch extends React.Component {
  render(): React.Element<*> {
    return (
      <div className={styles.container}>
        <Title
          className={genericStyles.pageTitle}
          content={{id: 'noMatch.title'}}
        />

        <Paragraph content={{id: 'noMatch.content'}} />
        <LinkButton
          content={{id: 'noMatch.homepageLink'}}
          state="primary"
          to="/"
        />
      </div>
    );
  }
}
