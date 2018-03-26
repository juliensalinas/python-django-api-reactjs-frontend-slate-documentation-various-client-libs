/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  forInRight,
} from 'lodash';

import {
  getCompany,
  removeCompanyResult,
} from '../actions';
import {
  GettingStarted,
  LookupView,
  LookupResult,
  Result,
} from '../components';

/**
 * Company lookup page
 *
 * @class
 */
export class CompanyLookupComponent extends React.Component {
  props: {
    companies : Object,
    dispatch  : Function,
  };

  static propTypes = {
    companies : React.PropTypes.object,
    dispatch  : React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    companies: {},
  };

  /**
   * Handle onSubmit
   * @param {string} value
   * @private
   * @return {void}
   */
  /* istanbul ignore next */
  handleSubmit = (value: string): void => {
    /* istanbul ignore next */
    this.props.dispatch(getCompany(value));
  }

  /**
   * Handle remove click
   * @param {string} id
   * @private
   * @return {function}
   */
  handleRemoveClick = (id: string): Function => {
    let {
      dispatch,
    } = this.props;

    return (evt: SyntheticUIEvent): void => {
      dispatch(removeCompanyResult(id));
    };
  }

  render(): React.Element<*> {
    let result = [];

    forInRight(this.props.companies, (company: ?Result, companyId: string): void => {
      if (company != null) {
        result.push(
          <LookupResult
            errorPrefix="company"
            key={company.id}
            onRemove={this.handleRemoveClick((company.id))}
            result={company}
          />
        );
      }
    });

    return (
      <div>
        <LookupView
          onSubmit={this.handleSubmit}
          placeholder={{id: 'company.input.placeholder'}}
        >
          {result}
          <GettingStarted />
        </LookupView>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    companies: state.companies,
  };
}

/* istanbul ignore next */
export const CompanyLookup = connect(mapStateToProps)(CompanyLookupComponent);
