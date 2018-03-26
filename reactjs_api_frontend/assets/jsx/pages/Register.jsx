/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
  ButtonGroup,
  checkFormCreator,
  FormGroup,
  PasswordTextInput,
  SubmitButton,
  TextInput,
  Title,
} from 'react';
import {
  get,
  isEmpty,
  noop,
} from 'lodash';

import {
  registerRequest,
} from '../actions';
import {
  ErrorMessage,
  LinkButton,
} from '../components';
import genericStyles from './Generic.css';
import {
  checkRegister,
  getUrl,
} from '../modules';

/**
 * Register page
 *
 * @class
 */
export class RegisterComponent extends React.Component {
  props: {
    currentlySending : boolean,
    dispatch         : Function,
    error            : Object,
    history          : Object,
  };

  state: {
    email     : string,
    errors    : Object,
    hasErrors : boolean,
    password  : string,
  };

  static propTypes = {
    currentlySending : React.PropTypes.bool,
    dispatch         : React.PropTypes.func.isRequired,
    error            : React.PropTypes.object,
    history          : React.PropTypes.object.isRequired,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      email     : '',
      errors    : {},
      hasErrors : false,
      password  : '',
    };
  }

  /* istanbul ignore next */
  checkForm = checkFormCreator(
    /* istanbul ignore next */
    (): ?Array<Object> => {
      /* istanbul ignore next */
      return checkRegister(
        this.state.email,
        this.state.password
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
   * @return {void}
   */
  handleOnSubmit = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();
    this.checkForm()
    .then((result: boolean): void => {
      // The form is not valid, don't do login
      if (!result) {
        return;
      }

      this.props.dispatch(registerRequest({
        email     : this.state.email,
        password  : this.state.password,
        onSuccess : () : void => {
          this.props.history.push(
            getUrl('/')
          );
        },
      }));
    })
    .catch(noop);
  }

  render(): React.Element<*> {
    let {
      currentlySending,
      error,
    } = this.props;

    if (error != null) {
      error = (
        <ErrorMessage error={error} />
      );
    }

    return (
      <div>
        <Title
          className={genericStyles.title}
          content={{id: 'register.title'}}
        />
        <form
          onSubmit={this.handleOnSubmit}
        >
          {error}
          <FormGroup errors={this.state.errors.email}>
            <TextInput
              autoCapitalize="off"
              autoCorrect="off"
              error={!isEmpty(this.state.errors.email)}
              name="email"
              onBlur={this.handleOnBlur('email')}
              onChange={this.handleOnChange('email')}
              placeholder={{id: 'register.form.email.placeholder'}}
              spellCheck="false"
              value={this.state.email}
              required
            />
          </FormGroup>
          <FormGroup errors={this.state.errors.password}>
            <PasswordTextInput
              error={!isEmpty(this.state.errors.password)}
              name="password"
              onBlur={this.handleOnBlur('password')}
              onChange={this.handleOnChange('password')}
              placeholder={{id: 'register.form.password.placeholder'}}
              value={this.state.password}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <LinkButton
              content={{id: 'register.actions.login'}}
              to="/login"
            />
            <SubmitButton
              content={{id: 'register.form.submit'}}
              loading={currentlySending}
            />
          </ButtonGroup>
        </form>
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
export const Register = connect(mapStateToProps)(RegisterComponent);
