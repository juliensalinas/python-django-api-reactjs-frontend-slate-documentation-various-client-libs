/* @flow */


import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {
  List,
  ListItem,
  Strong,
} from 'react';

import styles from './GettingStarted.css';
import {LookupPanel} from '../LookupPanel';
import {
  hideGettingStarted,
} from '../../actions';

const STEPS = [
  {
    id     : 'gettingStarted.steps.startLearning.value',
    values : {
      key: (
        <Strong content={{id: 'gettingStarted.steps.startLearning.key'}} />
      ),
    },
  },
  {
    id     : 'gettingStarted.steps.integrate.value',
    values : {
      key: (
        <Strong content={{id: 'gettingStarted.steps.integrate.key'}} />
      ),
    },
  },
  {
    id     : 'gettingStarted.steps.engage.value',
    values : {
      key: (
        <Strong content={{id: 'gettingStarted.steps.engage.key'}} />
      ),
    },
  },
];

/**
 * Getting started block
 *
 * @example
 * <GettingStartedComponent />
 */
export class GettingStartedComponent extends React.Component {
  props: {
    dispatch              : Function,
    displayGettingStarted : boolean,
  };

  static propTypes = {
    dispatch              : React.PropTypes.func.isRequired,
    displayGettingStarted : React.PropTypes.bool,
  };

  static defaultProps = {
    displayGettingStarted: false,
  };

  /**
   * Handle hide click
   * @param {Event} evt
   * @private
   * @return {void}
   */
  handleHideClick = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();
    this.props.dispatch(
      hideGettingStarted()
    );
  }

  render(): ?React.Element<*> {
    let {
      displayGettingStarted,
    } = this.props;

    let items = STEPS.map((step: Object): React.Element<*> => {
      return (
        <ListItem
          content={step}
          key={step.id}
        />
      );
    });

    let className = classNames(styles.gettingStarted, {
      [styles.isHidden]: !displayGettingStarted,
    });

    return (
      <LookupPanel
        className={className}
        onClose={this.handleHideClick}
        title={{id: 'gettingStarted.title'}}
      >
        <List className={styles.list} ordered>
          {items}
        </List>
      </LookupPanel>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state: Object): Object {
  return {
    displayGettingStarted: state.displayGettingStarted,
  };
}

/* istanbul ignore next */
export const GettingStarted = connect(mapStateToProps)(GettingStartedComponent);
