/* @flow */

import React from 'react';

import {
  get,
} from 'lodash';

import styles from './LookupForm.css';

/**
 * Render a lookup form with a `placeholder`.
 *
 * @example
 * <LookupForm onSubmit={handleSubmit} placeholder="test" />
 */
export class LookupForm extends React.Component {
  props: {
    onSubmit    : Function,
    placeholder : any,
  };

  state: {
    value: string,
  };

  static propTypes = {
    onSubmit    : React.PropTypes.func.isRequired,
    placeholder : PropTypes.content,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      value: '',
    };
  }

  /**
   * Handle onChange
   * @param {string} name
   * @private
   * @return {function}
   */
  handleOnChange = (name: string): Function => {
    return (evt: SyntheticUIEvent): void => {
      let value = get(evt, ['target', 'value']);
      /* eslint-disable react/no-set-state */
      this.setState({
        [name]: value,
      });
      /* eslint-enable react/no-set-state */
    };
  };

  /**
   * Handle onSubmit
   * @param {Event} evt
   * @private
   * @return {void}
   */
  handleSubmit = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();

    this.props.onSubmit(this.state.value);
    /* eslint-disable react/no-set-state */
    this.setState({
      value: '',
    });
    /* eslint-enable react/no-set-state */
  }

  render(): React.Element<*> {
    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <TextInput
          className={styles.input}
          name="value"
          onChange={this.handleOnChange('value')}
          placeholder={this.props.placeholder}
          value={this.state.value}
          autoFocus
        />
        <SubmitButton
          className={styles.submit}
          content={{id: 'global.search'}}
          key="submit"
          type="submit"
        />
      </form>
    );
    /* eslint-enable jsx-a11y/no-autofocus */
  }
}
