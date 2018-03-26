/* @flow */

import {
  CHANGE_PASSWORD_WITH_SECRET,
  CLEAR_ERROR,
  RESET_PASSWORD,
  GET_COMPANY,
  GET_CONTACT,
  HIDE_GETTING_STARTED,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REMOVE_COMPANY_RESULT,
  REMOVE_CONTACT_RESULT,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
} from './constants';

/**
 * Set the `currentlySending` state, which display a loading indicator during requests.
 *
 * @param {boolean} sending - True means we're sending a request, false means we're not
 * @return {Object}
 */
export function sendingRequest(sending: boolean): Object {
  return {
    type: SENDING_REQUEST,
    sending,
  };
}

/**
 * Tell the app that we want to log in a user.
 *
 * @param {Object} data          - The data we're sending for log in
 * @param {string} data.email    - The email of the user to log in
 * @param {string} data.password - The password of the user to log in
 * @return {Object}
 */
export function loginRequest(data: Object): Object {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

/**
 * Tell the app that we want to log out the user.
 *
 * @return {Object}
 */
export function logout(): Object {
  return {
    type         : SET_AUTH,
    newAuthState : false,
  };
}

/**
 * Tell the app that we want to register a user.
 *
 * @param {Object} data          - The data we're sending for registration
 * @param {string} data.email    - The email of the user to register
 * @param {string} data.password - The password of the user to register
 * @return {Object}
 */
export function registerRequest(data: Object): Object {
  return {
    type: REGISTER_REQUEST,
    data,
  };
}

/**
 * Tell the app that we want to reset the password.
 *
 * @param {Object} data              - The data we're sending for registration
 * @param {string} data.email        - The email of the user to register
 * @param {?function} data.onSuccess - Callback called on success
 * @return {Object}
 */
export function resetPasswordRequest(data: Object): Object {
  return {
    type: RESET_PASSWORD,
    data,
  };
}

/**
 * Tell the app that we want to change the password.
 *
 * @param {Object} data                 - The data we're sending to change the password
 * @param {string} data.password        - The new password
 * @param {string} data.confirmPassword - The new password confirmation
 * @param {string} data.secret          - The secret
 * @return {Object}
 */
export function changePasswordWithSecretRequest(data: Object): Object {
  return {
    type: CHANGE_PASSWORD_WITH_SECRET,
    data,
  };
}

/**
 * Set the `error` state to the error received.
 *
 * @param {Object} error - The error we got when trying to make the request
 * @return {Object}
 */
export function requestError(error: Object): Object {
  return {
    type: REQUEST_ERROR,
    error,
  };
}

/**
 * Clear the `error` state.
 *
 * @return {Object}
 */
export function clearError(): Object {
  return {
    type: CLEAR_ERROR,
  };
}

/**
 * Tell the app that we want to retrieve company details.
 *
 * @param {string} domain - The domain used to retrieve company details
 * @return {Object}
 */
export function getCompany(domain: string): Object {
  return {
    type : GET_COMPANY,
    data : {
      domain,
    },
  };
}

/**
 * Tell the app that we want to remove a company result.
 *
 * @param {number} id - The id of the company result to remove
 * @return {Object}
 */
export function removeCompanyResult(id: string): Object {
  return {
    type : REMOVE_COMPANY_RESULT,
    data : {
      id,
    },
  };
}

/**
 * Tell the app that we want to remove a contact result.
 *
 * @param {number} id - The id of the contact result to remove
 * @return {Object}
 */
export function removeContactResult(id: string): Object {
  return {
    type : REMOVE_CONTACT_RESULT,
    data : {
      id,
    },
  };
}

/**
 * Tell the app that we want to retrieve contact details.
 *
 * @param {string} email - The email used to retrieve contact details
 * @return {Object}
 */
export function getContact(email: string): Object {
  return {
    type : GET_CONTACT,
    data : {
      email,
    },
  };
}

/**
 * Tell the app that we want to hide the `Getting started` block.
 *
 * @return {Object}
 */
export function hideGettingStarted(): Object {
  return {
    type: HIDE_GETTING_STARTED,
  };
}
