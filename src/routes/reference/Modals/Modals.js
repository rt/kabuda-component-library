import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Modals.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import ModalClosable from '../../../components/ModalClosable';
import AccessibilityNote from '../AccessibilityNote';
import loremIpsum from 'lorem-ipsum';
import Loader from '../../../components/Loader';
import Tooltip from '../../../components/Tooltip';
import Popover from '../../../components/Popover';
import Toast from '../../../components/Toast';
import SideBar from '../../../components/SideBar';
import Drawer from '../../../components/Drawer';
import ToggleTextButton from '../../../components/ToggleTextButton';
import { actions as homeActions } from '../../../libs/home';

export class Modals extends Base {
    constructor(props) {
        super(props);

        this.overlayKey = null;
        this.overlayKeyClosable = null;

        this.state = {
            drawerState: false,
        };
    }

    componentWillMount() {
        homeActions.appState.getOverlayId().then((id) => {
            this.overlayKey = id;
        });
        homeActions.appState.getOverlayId().then((id) => {
            this.overlayKeyClosable = id;
        });
    }

    openModal = (e) => {
        homeActions.appState.setOverlayId(this.overlayKey, true);
        e.stopPropagation(); // dont trigger window close handler
    }

    closeModal = () => {
        homeActions.appState.setOverlayId(this.overlayKey, false);
    }

    getModal = () => {
        if (this.props.appState.overlays[this.overlayKey]) {
            return (
                <Modal
                    id="referenceModalId"
                    appState={this.props.appState}
                    title="Title"
                    buttons={[
                        {
                        },
                        {
                        },
                    ]}
                    onCloseBtnClick={this.closeModal}
                >
                    <h3>hello modal</h3>
                    <p>{this.getLoremIpsum()}</p>
                </Modal>
            );
        }
        return null;
    }

    openLoadingModal = () => {
        const state = this.state;
        state.showLoadingModal = true;
        this.setState(state);

        setTimeout(() => {
            const state = this.state;
            state.showLoadingModal = false;
            this.setState(state);
        }, 2000);
    }

    getLoadingModal = () => {
        if (this.state.showLoadingModal) {
            return (
                <Modal
                    id="referenceLoadingModalId"
                    appState={this.props.appState}
                >
                    <div><Loader /></div>
                </Modal>
            );
        }
    }

    openModalClosable = (e) => {
        homeActions.appState.setOverlayId(this.overlayKeyClosable, true);
        e.stopPropagation(); // dont trigger window close handler
    }

    getModalClosable() {
        if (this.props.appState.overlays[this.overlayKeyClosable]) {
            return (
                <ModalClosable
                    appState={this.props.appState}
                    onCloseBtnClick={this.closeModalClosable}
                >
                    <h3>hello modal</h3>
                    <p>{this.getLoremIpsum()}</p>
                </ModalClosable>
            );
        }
        return null;
    }

    closeModalClosable = () => {
        homeActions.appState.setOverlayId(this.overlayKeyClosable, false);
    }

    getLoremIpsum = () => loremIpsum({
        count: 1,
        units: 'paragraphs',
        paragraphUpperBound: 3,
    })

    showToast(e) {
        const state = this.state;
        state.showToast = true;
        this.setState(state);
    }

    getToast = () => {
        if (this.state.showToast) {
            return (<Toast
                appState={this.props.appState}
                text="toast text"
            />);
        }
        return null;
    }

    setDrawerState = (val) => {
        this.setState({ drawerState: val });
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                Other than route change you may have information you want to display in a timely fashion.
                Drawers offer more detailed information while menus display new action/link options.  They could hold buttons, links, or define their own.  When displayed focus should be on the first actionable item.

                <Section title="Modals">
                    <SubSection>
                        <div key="main" className={s.buttonHor}>
                            <Button data-e2e="openStandardModalBtn" onClick={this.openModal}>Open Modal</Button>
                            {this.getModal()}
                            <Button data-e2e="openLoadingModal" onClick={this.openLoadingModal}>Open Loading Modal</Button>
                            {this.getLoadingModal()}
                            <Button onClick={this.openModalClosable}>Open Closable Modal</Button>
                            {this.getModalClosable()}
                        </div>
                        <div key="notes">
                            <AccessibilityNote>
                                Use <code>role="progressbar"</code> and <code>aria-valuetext="Loading"</code>.  Screen readers often ignore child elements, thus <code>sr-only</code> cannot be used.
                            </AccessibilityNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Drawers">
                    <SubSection>
                        <div key="main">
                    Drawers open new content inline with the page flow.
                            <div>
                                <ToggleTextButton
                                    model={this.state.drawerState}
                                    trueText="Close"
                                    falseText="Details ..."
                                    onClick={(val) => { this.setDrawerState(val); }}
                                />
                            </div>
                            <Drawer drawerState={this.state.drawerState}>
                                <div>
                                    <p>{this.getLoremIpsum()}</p>
                                    <p>{this.getLoremIpsum()}</p>
                                    <p>{this.getLoremIpsum()}</p>
                                </div>
                            </Drawer>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Stack Panels / Tab Panel">
                    <SubSection>
                        <div key="main" />
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Tooltips and Popovers">
                    <SubSection>
                        <div key="main">
                            <Tooltip
                                text="Hover over me"
                                tooltip="Tooltip text very long description blah blah"
                            />
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <Popover
                                appState={this.props.appState}
                                text="Click Me!"
                                popover="Popover text very long description blah blah"
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Toast">
                    <SubSection>
                        <div key="main">
                            <Button onClick={this.showToast.bind(this)}>Show Toast</Button>
                            {this.getToast()}
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="SideBar">
                    <SubSection>
                        <div key="main">
                            <SideBar type="card" src="http://placehold.it/350x150" />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Modals);
