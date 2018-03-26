/*
 * The reducer takes care of state changes in our app through actions
 */

/* eslint-disable max-depth */
import {
  omit,
} from 'lodash';

import {
  ADD_COMPANY,
  ADD_CONTACT,
  CLEAR_ERROR,
  HIDE_GETTING_STARTED,
  REMOVE_COMPANY_RESULT,
  REMOVE_CONTACT_RESULT,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
  SET_COMPANY,
  SET_CONTACT,
} from '../actions/constants';
import auth from '../auth';

// The initial application state
let initialState = {
  companies             : {},
  contacts              : {},
  currentlySending      : false,
  displayGettingStarted : true,
  error                 : null,
  auth                  : {
    ...auth.infos(),
  },
};

// Takes care of changing the application state
export default function reducer(
  state: Object = initialState,
  action: Object = {}
): Object {
  switch (action.type) {
    case SET_AUTH:
      let newData = {
        auth: {
          loggedIn: action.newAuthState,
        },
      };

      if (!action.newAuthState) {
        for (let keyToClear of ['companies', 'contacts']) {
          /* istanbul ignore else */
          if (state[keyToClear] != null) {
            newData[keyToClear]  = {};
          }
        }
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('verified');
      } else {
        newData.auth.email    = action.email;
        newData.auth.token    = action.token;
        newData.auth.verified = action.verified;
        localStorage.setItem('email', action.email);
        localStorage.setItem('token', action.token);
        localStorage.setItem('verified', JSON.stringify(action.verified));
      }

      return {
        ...state,
        ...newData,
      };

    case SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.sending,
      };

    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ADD_COMPANY:
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.id]: {
            id      : action.id,
            name    : action.domain,
            fetched : false,
          },
        },
      };

    case SET_COMPANY:
      if (state.companies[action.id] == null) {
        return state;
      }

      let companies = {
        ...state.companies,
        [action.id]: {
          ...state.companies[action.id],
          data    : action.data,
          fetched : action.fetched,
          error   : action.error,
        },
      };

      return {
        ...state,
        companies,
      };

    case REMOVE_COMPANY_RESULT:
      return {
        ...state,
        companies: omit(state.companies, action.data.id),
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.id]: {
            id      : action.id,
            name    : action.email,
            fetched : false,
          },
        },
      };

    case SET_CONTACT:
      if (state.contacts[action.id] == null) {
        return state;
      }

      let contacts = {
        ...state.contacts,
        [action.id]: {
          ...state.contacts[action.id],
          data    : action.data,
          fetched : action.fetched,
          error   : action.error,
        },
      };

      return {
        ...state,
        contacts,
      };

    case REMOVE_CONTACT_RESULT:
      return {
        ...state,
        contacts: omit(state.contacts, action.data.id),
      };

    case HIDE_GETTING_STARTED:
      return {
        ...state,
        displayGettingStarted: false,
      };

    default:
      return state;
  }
}
/* eslint-enable max-depth */
