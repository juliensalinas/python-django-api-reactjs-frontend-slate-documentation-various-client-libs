/* @flow */

import React from 'react';
import {
  get,
} from 'lodash';

import styles from './ErrorMessage.css';
import {getErrorContent} from '../../../../src/modules';

/**
 * Component used to display error message in forms.
 *
 * @example
 * <ErrorMessage content="Content of the error" />
 * @example
 * <ErrorMessage content={{id: 'error.id'}} />
 * @example
 * <ErrorMessage error={{code: '10'}} />
 */
export class ErrorMessage extends React.Component {
  props: {
    content ?: any,
    error   ?: Object,
  };

  static propTypes = {
    content : React.PropTypes.any,
    error   : React.PropTypes.shape({
      code: React.PropTypes.string.isRequired,
    }),
  };

  render(): any {
    let {
      content,
      error,
    } = this.props;

    if (content == null) {
      let errorCode = get(error, ['code']);
      content = getErrorContent(errorCode);
    }

    return (
      <Paragraph
        className={styles.error}
        content={content}
      />
    );
  }
}
