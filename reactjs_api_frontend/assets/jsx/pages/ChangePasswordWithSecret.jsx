/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
  checkFormCreator,
  SubmitButton,
  FormGroup,
  Paragraph,
  PasswordTextInput,
  Title,
} from 'react';
import {
  get,
  isEmpty,
  noop,
} from 'lodash';

import {
  changePasswordWithSecretRequest,
} from '../actions';
import {
  ErrorMessage,
  LinkButton,
} from '../components';
import genericStyles from './Generic.css';
import {
  checkNewPassword,
} from '../modules';

/**
 * Change password page
 *
 */
export class ChangePasswordWithSecretComponent extends React.Component {
  props: {
    currentlySending  : boolean,
    dispatch          : Function,
    error            ?: Object,
    match             : Object,
  };

  state: {
    confirmPassword : string,
    errors          : Object,
    hasErrors       : boolean,
    password        : string,
    success         : ?boolean,
  };

  static propTypes = {
    currentlySending : React.PropTypes.bool,
    dispatch         : React.PropTypes.func.isRequired,
    error            : React.PropTypes.object,
    match            : React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    currentlySending: false,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      confirmPassword : '',
      errors          : {},
      hasErrors       : false,
      password        : '',
      success         : null,
    };
  }

  /* istanbul ignore next */
  checkForm = checkFormCreator(
    /* istanbul ignore next */
    (): ?Array<Object> => {
      /* istanbul ignore next */
      return checkNewPassword(
        this.state.password,
        this.state.confirmPassword
      );
    }
  );

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
   * Handle onBlur
   * @param {string} name
   * @private
   * @return {function}
   */
  handleOnBlur = (name: string): Function => {
    return (evt: SyntheticUIEvent): void => {
      this.checkForm(name);
    };
  };

  /**
   * Handle onSubmit
   * @param {Event} evt
   * @private
   * @return {function}
   */
  handleOnSubmit = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();
    this.checkForm()
    .then((result: boolean): void => {
      // The form is not valid, don't do login
      if (!result) {
        return;
      }

      this.props.dispatch(changePasswordWithSecretRequest({
        password        : this.state.password,
        confirmPassword : this.state.confirmPassword,
        secret          : this.props.match.params.secret,
        onSuccess       : () : void => {
          /* eslint-disable react/no-set-state */
          this.setState({
            success: true,
          });
          /* eslint-enable react/no-set-state */
        },
      }));
    })
    .catch(noop);
  };

  render(): React.Element<*> {
    let {
      currentlySending,
      error,
    } = this.props;

    let children = [];

    if (error != null) {
      error = (
        <ErrorMessage error={error} />
      );
    }

    if (this.state.success === true) {
      children.push(
        <Paragraph
          content={{id: 'changePasswordWithSecret.success.content'}}
          key="success"
        />
      );
      children.push(
        <LinkButton
          content={{id: 'changePasswordWithSecret.success.actions.login'}}
          key="login"
          state="primary"
          to="/login"
        />
      );
    } else {
      let actions = [
        <SubmitButton
          content={{id: 'changePasswordWithSecret.form.submit'}}
          key="submit"
          loading={currentlySending}
          type="submit"
        />,
      ];

      children.push(
        <form
          key="form"
          onChange={this.handleOnChange}
          onSubmit={this.handleOnSubmit}
        >
          {error}
          <FormGroup errors={this.state.errors.pasword}>
            <PasswordTextInput
              autoCapitalize="off"
              autoCorrect="off"
              error={!isEmpty(this.state.errors.password)}
              name="password"
              onBlur={this.handleOnBlur('password')}
              onChange={this.handleOnChange('password')}
              placeholder={{id: 'changePasswordWithSecret.form.password.placeholder'}}
              spellCheck="false"
              value={this.state.password}
              required
            />
          </FormGroup>
          <FormGroup errors={this.state.errors.confirmPassword}>
            <PasswordTextInput
              autoCapitalize="off"
              autoCorrect="off"
              error={!isEmpty(this.state.errors.confirmPassword)}
              name="confirmPassword"
              onBlur={this.handleOnBlur('confirmPassword')}
              onChange={this.handleOnChange('confirmPassword')}
              placeholder={{id: 'changePasswordWithSecret.form.confirmPassword.placeholder'}}
              spellCheck="false"
              value={this.state.confirmPassword}
              required
            />
          </FormGroup>
          {actions}
        </form>
      );
    }

    return (
      <div>
        <Title
          className={genericStyles.title}
          content={{id: 'changePasswordWithSecret.title'}}
        />
        {children}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    currentlySending : state.currentlySending,
    error            : state.error,
  };
}

/* istanbul ignore next */
export const ChangePasswordWithSecret = connect(mapStateToProps)(ChangePasswordWithSecretComponent);
