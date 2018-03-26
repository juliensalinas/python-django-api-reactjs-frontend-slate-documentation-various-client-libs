/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
/**
 * import {
 * get,
 * } from 'lodash';
 */
import {
  Nav,
} from 'react';
import {
  CogOutlineIcon,
  ContactsIcon,
  /* DocumentTextIcon, */
  ExportOutlineIcon,
  HomeOutlineIcon,
  InfoLargeOutlineIcon,
  KeyOutlineIcon,
  MessagesIcon,
  WorldOutlineIcon,
  CreditCardIcon,
} from 'react/lib/components/icons/typicons';

import styles from './Sidebar.css';
import {SidebarItem} from './SidebarItem';
import {
  logout,
} from '../../actions';
import {
  myappIcon,
} from '../icons';
import {
  API_URL,
} from '../../../../src/constants';

/**
 * Render the sidebar.
 *
 * @class
 * @example
 * <Sidebar />
 */
export class SidebarComponent extends React.Component {
  props: {
    auth : Object,
    dispatch: Function,
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  handleRedirectionToRoot = (): void => {
    window.location = 'https://' + window.location.hostname + '/subscription/' + this.props.auth.token + '/';
  };

  handleLogoutClick = (): void => {
    this.props.dispatch(logout());
  };

  render(): React.Element<*> {
    /* let verified = get(this.props, ['auth', 'verified'], false); */
    return (
      <aside className={styles.sidebar}>
        <h1><myappIcon className={styles.logo} /></h1>
        <Nav
          className={styles.nav}
          direction="vertical"
        >
          <SidebarItem
            Icon={HomeOutlineIcon}
            content={{id: 'sidebar.dashboard'}}
            to="/"
            exact
          />
          {/*
          {verified &&
            <SidebarItem
              Icon={WorldOutlineIcon}
              content={{id: 'sidebar.companyLookup'}}
              to="/company"
              exact
            />
          }
          */}
          <SidebarItem
            Icon={WorldOutlineIcon}
            content={{id: 'sidebar.companyLookup'}}
            to="/company"
            exact
          />
          {/*
          {verified &&
            <SidebarItem
              Icon={ContactsIcon}
              content={{id: 'sidebar.contactLookup'}}
              to="/contact"
              exact
            />
          }
          */}
          <SidebarItem
            Icon={ContactsIcon}
            content={{id: 'sidebar.contactLookup'}}
            to="/contact"
            exact
          />
          <SidebarItem
            Icon={CogOutlineIcon}
            content={{id: 'sidebar.account'}}
            to="/account"
            exact
          />
          <SidebarItem
            Icon={KeyOutlineIcon}
            content={{id: 'sidebar.apiKey'}}
            to="/key"
            exact
          />
          <SidebarItem
            Icon={CreditCardIcon}
            content={{id: 'sidebar.subscription'}}
            href="#"
            onClick={this.handleRedirectionToRoot}
            exact
          />
        </Nav>
        <Nav
          className={styles.nav}
          direction="vertical"
        >
          {/*
          <SidebarItem
            Icon={DocumentTextIcon}
            content={{id: 'sidebar.getStarted'}}
            to="/get-started"
            exact
          />
          */}
          <SidebarItem
            Icon={InfoLargeOutlineIcon}
            content={{id: 'sidebar.apiDocs'}}
            href={API_URL}
          />
          <SidebarItem
            Icon={MessagesIcon}
            content={{id: 'sidebar.support'}}
            to="/support"
            exact
          />
        </Nav>
        <Nav
          className={styles.nav}
          direction="vertical"
        >
          <SidebarItem
            Icon={ExportOutlineIcon}
            content={{id: 'sidebar.logout'}}
            href="#"
            onClick={this.handleLogoutClick}
          />
        </Nav>
      </aside>
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
export const Sidebar = connect(mapStateToProps, null, null, {
  pure: false,
})(SidebarComponent);
