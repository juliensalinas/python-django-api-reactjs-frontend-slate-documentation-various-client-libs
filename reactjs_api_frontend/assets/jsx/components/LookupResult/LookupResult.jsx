/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  ObjectToList,
  Paragraph,
} from 'react';
import {
  Spinner3Icon,
} from 'react/lib/components/icons/evilIcons';

import styles from './LookupResult.css';
import {LookupPanel} from '../LookupPanel';
import {
  formatDate,
} from '../../modules';

export type Result = {
  data    ?: Object,
  error   ?: ?Error,
  fetched  : boolean,
  id       : string,
  name     : string,
};

export function getKey(key: string, value: any): Object {
  return {
    id: `fields.${key}`,
  };
}

/**
 * Render a lookup result.
 *
 * @class
 * @example
 * <LookupResult errorPrefix="company" onRemove={handleRemove} result={{}} />
 */
export class LookupResult extends React.Component {
  props: {
    errorPrefix  : string,
    onRemove    ?: Function,
    result       : Result,
  };

  static propTypes = {
    errorPrefix : React.PropTypes.string.isRequired,
    onRemove    : React.PropTypes.func,
    result      : React.PropTypes.shape({
      data    : React.PropTypes.object,
      error   : React.PropTypes.object,
      fetched : React.PropTypes.bool.isRequired,
      id      : React.PropTypes.string.isRequired,
      name    : React.PropTypes.string.isRequired,
    }).isRequired,
  };

  static contextTypes = {
    react: React.PropTypes.object,
  };

  static defaultProps = {
    onRemove: null,
  };

  /**
   * Return formated date for `lastUpdated` field
   * @param {*} value
   * @param {string} key
   * @private
   * @return {*}
   */
  getValue = (value: any, key: string): any => {
    /* istanbul ignore next */
    if (
      key === 'lastUpdated' &&
      this.context.react != null
    ) {
      return formatDate(value, this.context.react.moment);
    }

    return value;
  };

  render(): React.Element<*> {
    let {
      errorPrefix,
      result,
    } = this.props;

    let children;

    if (!result.fetched) {
      children = (
        <div className={styles.loading}>
          <Spinner3Icon className={styles.spinner} />
        </div>
      );
    } else if (result.error != null) {
      let errorContent;

      if (result.error.name === 'TooManyRequestsError') {
        errorContent = {
          id: 'global.error.TooManyRequestsError',
        };
      } else if (result.error.name === 'InvalidDomainError') {
        errorContent = {
          id: 'global.error.InvalidDomainError',
        };
      } else if (result.error.name === 'InvalidEmailError') {
        errorContent = {
          id: 'global.error.InvalidEmailError',
        };
      } else {
        errorContent = {
          id: `${errorPrefix}.notFound`,
        };
      }
      children = (
        <Paragraph content={errorContent} />
      );
    } else {
      children = (
        <ObjectToList
          className={styles.list}
          getKey={getKey}
          getValue={this.getValue}
          linkClassName={styles.link}
          object={result.data}
          rowClassName={styles.row}
          detectUrl
        />
      );
    }

    return (
      <LookupPanel
        className={styles.panel}
        key={result.id}
        onClose={this.props.onRemove}
        title={result.name}
      >
        {children}
      </LookupPanel>
    );
  }
}
