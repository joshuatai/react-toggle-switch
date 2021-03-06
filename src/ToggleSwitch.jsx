import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Anchor from '@trendmicro/react-anchor';
import styles from './index.styl';

export default class extends Component {
    static propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        size: PropTypes.oneOf([
            'lg',
            'large',
            'sm',
            'small'
        ])
    };
    static defaultProps = {
        checked: false,
        disabled: false,
        size: 'lg'
    };

    state = {
        checked: this.props.checked
    };
    actions = {
        handleChange: (event) => {
            event.preventDefault();

            if (this.props.disabled) {
                return;
            }

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(event);
                return;
            }

            this.setState({ checked: !this.state.checked });
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ checked: nextProps.checked });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    get checked() {
        return this.state.checked;
    }
    render() {
        const {
            className,
            disabled,
            size,
            ...props
        } = this.props;

        delete props.checked;
        delete props.onChange;

        return (
            <Anchor
                {...props}
                className={classNames(
                    className,
                    styles.switch,
                    { [styles.switchSm]: size === 'sm' || size === 'small' },
                    { [styles.checked]: this.state.checked }
                )}
                onClick={this.actions.handleChange}
            >
                <div
                    className={classNames(
                        styles.toggle,
                        { [styles.toggleSm]: size === 'sm' || size === 'small' },
                        styles.round,
                        { [styles.disabled]: disabled }
                    )}
                />
            </Anchor>
        );
    }
}
