/* @flow */


import React from 'react';
import {
  NavLink,
  Link,
} from 'react-router-dom';
import 'react/css/sanitize.css';
import 'react/css/base.css';
import {
  react,
} from 'react';
import {
  get,
} from 'lodash';

import {
  DEFAULT_LOCALE,
  LOCALES,
  WEBSITE_TITLE,
} from '../../../src/constants';

/**
 * Initialize react instance, locales, etc.
 *
 * @example
 * <Content />
 */
export class Content extends React.Component {
  props: {
    children ?: any,
  };

  static propTypes = {
    children: React.PropTypes.any,
  };

  static contextTypes = {
    intl: React.PropTypes.object,
  };

  render(): React.Element<*> {
    let {
      intl,
    } = this.context;

    let alternateLocales = [];

    /* istanbul ignore next */
    if (intl != null) {
      for (let locale of LOCALES) {
        if (intl.locale !== locale) {
          alternateLocales.push({
            content  : locale,
            property : 'og:locale:alternate',
          });
        }
      }

      alternateLocales.push({
        property : 'og:locale',
        content  : intl.locale,
      });
    }

    let {
      children,
    } = this.props;

    let meta = [
      {
        content  : WEBSITE_TITLE,
        property : 'og:site_name',
      },
      {
        content  : '',
        property : 'og:image',
      },
      ...alternateLocales,
    ];

    let settings = {
      reactRouterLink    : Link,
      reactRouterNavLink : NavLink,
    };

    /* istanbul ignore next */
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined'
    ) {
      window.intl = intl;
    }

    let serverSide = false;

    /* istanbul ignore next */
    if (process.env.SERVER_SIDE) {
      serverSide = true;
    }

    let lang = get(intl, ['local'], DEFAULT_LOCALE);

    return (
      <react
        lang={lang}
        meta={meta}
        serverSide={serverSide}
        settings={settings}
        title={{id: 'meta.title'}}
        titleTemplate={{id: 'meta.titleTemplate'}}
      >
        {children}
      </react>
    );
  }
}
