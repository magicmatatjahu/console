import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FdModal } from './styled';

class Modal extends Component {
    state = {
        show: false,
    }

    static propTypes = {
        title: PropTypes.any,
        modalOpeningComponent: PropTypes.any.isRequired,
        actions: PropTypes.any,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onConfirm: PropTypes.func.isRequired,
        confirmText: PropTypes.string,
        cancelText: PropTypes.string,
        type: PropTypes.string,
    };

    static defaultProps = {
        title: 'Modal',
        confirmText: "Confirm",
        cancelText: "Cancel",
        actions: null,
        type: "default",
    };

    onOpen = () => {
        const { onShow } = this.props;
        if (onShow && typeof onShow === 'function') {
          onShow();
        }
        this.setState({ show: true })
    }

    onClose = () => {
        const { onHide } = this.props;
        if (onHide && typeof onHide === 'function') {
          onHide();
        }
        this.setState({ show: false })
    }

    onConfirmation = () => {
        const { onConfirm } = this.props;
        if (onConfirm && typeof onConfirm === 'function') {
          onConfirm();
        }
        this.onClose();
    }

    confirmActions = () => {
        const { props: { confirmText, cancelText, type } } = this;

        return (
            <Fragment>
                <Button
                    style={{ marginRight: "12px" }}
                    option="light"
                    onclick={this.onClose}
                >
                    {cancelText}
                </Button>
                <Button
                    option="emphasized"
                    type={type}
                    onclick={this.onConfirmation}
                >
                    {confirmText}
                </Button>
            </Fragment>
        )
    }

    render() {
        const { props: { children, title, modalOpeningComponent, actions, onConfirm, type }, state: { show } } = this;

        let ac = actions;
        if (!ac && onConfirm && typeof onConfirm === 'function') {
            ac = this.confirmActions();
        }

        return (
            <Fragment>
                <div onClick={this.onOpen}>{modalOpeningComponent}</div>
                <FdModal type={type} title={title} show={show} onClose={this.onClose} actions={ac}>
                    {children}
                </FdModal>
            </Fragment>
        );
    }
}

export default Modal;
