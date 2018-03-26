/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
  ButtonGroup,
  checkFormCreator,
  FormGroup,
  Paragraph,
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
  resetPasswordRequest,
} from '../actions';
import {
  ErrorMessage,
  LinkButton,
} from '../components';
import genericStyles from './Generic.css';
import {
  checkForgottenPassword,
} from '../modules';

/**
 * Forgotten password page
 *
 * @class
 */
export class ForgottenPasswordComponent extends React.Component {
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
    success   : ?boolean,
  };

  static propTypes = {
    currentlySending : React.PropTypes.bool,
    dispatch         : React.PropTypes.func.isRequired,
    error            : React.PropTypes.object,
    history          : React.PropTypes.object,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      email     : '',
      errors    : {},
      hasErrors : false,
      success   : null,
    };
  }

  /* istanbul ignore next */
  checkForm = checkFormCreator(
    /* istanbul ignore next */
    (): ?Array<Object> => {
      return checkForgottenPassword(
        this.state.email
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

      this.props.dispatch(resetPasswordRequest({
        email     : this.state.email,
        onSuccess : () : void => {
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
        <ErrorMessage content={{id: 'global.error'}} />
      );
    } else if (this.state.success === true) {
      children.push(
        <Paragraph
          content={{id: 'forgottenPassword.success'}}
          key="success"
        />
      );
    } else {
      let actions = [
        <LinkButton
          content={{id: 'forgottenPassword.actions.login'}}
          key="login"
          to="/login"
        />,
        <SubmitButton
          content={{id: 'forgottenPassword.form.submit'}}
          key="submit"
          loading={currentlySending}
        />,
      ];

      children.push(
        <Paragraph
          content={{id: 'forgottenPassword.content'}}
          key="content"
        />
      );

      children.push(
        <form
          key="form"
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
              placeholder={{id: 'forgottenPassword.form.email.placeholder'}}
              spellCheck="false"
              value={this.state.email}
              required
            />
          </FormGroup>
          <ButtonGroup>
            {actions}
          </ButtonGroup>
        </form>
      );
    }

    return (
      <div>
        <Title
          className={genericStyles.title}
          content={{id: 'forgottenPassword.title'}}
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
export const ForgottenPassword = connect(mapStateToProps)(ForgottenPasswordComponent);
