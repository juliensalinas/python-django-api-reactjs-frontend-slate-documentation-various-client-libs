/* @flow */

/* eslint-disable no-lone-blocks */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  /* Link, */
  Paragraph,
  Title,
} from 'react';

import genericStyles from './Generic.css';

/**
 * Dashboard page
 *
 * @class
 */
export class DashboardComponent extends React.Component {
  props: {
    auth : Object,
  };

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
  };

  render(): React.Element<*> {
    { /* let verified = 'Anonymous';

    if (this.props.auth.verified) {
      verified = 'Verified';
    } */ }

    { /* let contactEmailContent = {
      id: 'dashboard.contactEmail',
    }; */ }

    { /* let contactEmail = (
      <Link content={contactEmailContent} href="mailto:info@myapp.com" />
    ); */ }

    { /* let content3ParagraphContent = {
      id     : 'dashboard.content3',
      values : {
        contactEmail,
      },
    }; */ }

    return (
      <div>
        <div>
          <Title
            className={genericStyles.pageTitle}
            content={{id: 'dashboard.title'}}
          />
          <Paragraph content={{id: 'dashboard.content1'}} />
          <Paragraph content={{id: 'dashboard.content2'}} />
          { /* <Paragraph content={content3ParagraphContent} /> */ }
          <Paragraph content={{id: 'dashboard.content4'}} />
          <Paragraph content={{id: 'dashboard.content5'}} />
        </div>
        { /* <Paragraph>Verified : {verified}</Paragraph> */ }
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
export const Dashboard = connect(mapStateToProps)(DashboardComponent);

/* eslint-enable no-lone-blocks */
