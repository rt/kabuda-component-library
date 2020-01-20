import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Buttons.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import Panel from '../../../components/Panel';
import Code from '../../../components/Code';
import ButtonGroup from '../../../components/ButtonGroup';
import ToggleTextButton from '../../../components/ToggleTextButton';
import FaCopy from 'react-icons/lib/fa/copy';
import FaCut from 'react-icons/lib/fa/cut';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import FaTrash from 'react-icons/lib/fa/trash';
import FaSpinner from 'react-icons/lib/fa/spinner';

export class Buttons extends Base {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            toggleButtonState: false,
        };

        this.handleToggleButtonClick = (e) => { this.setState({ toggleButtonState: !this.state.toggleButtonState }); };
        this.doSomething = () => { this.setState({ doSomethingText: 'do something' }); };
        this.submit = () => { this.setState({ submitText: 'submitted' }); };
    }

    getInnerButton = () => (this.state.loading ? <span><FaSpinner /> Loading </span> : <span><FaCloudUpload /> Upload (simulate)</span>)

    simulateUploadForButtonDemo = () => {
        this.state.loading = true;
        this.setState(this.state);
        setTimeout(() => {
            this.state.loading = false;
            this.setState(this.state);
        }, 3000);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <p>Buttons raise actions.  They may open a menu or a modal. Buttons are expected to be triggered using the Space key</p>

                <Panel>
                    <div className={s.buttonsHor}>
                        <p>
                            <Button onClick={this.doSomething}>Click Me!</Button> {this.state.doSomethingText}
                        </p>
                        <p>
                            <Button type="submit" onClick={this.submit}>Submit</Button> {this.state.submitText}
                        </p>
                    </div>
                </Panel>
                <Section title="Button Types: Default, Primary, Secondary">
                    <SubSection>
                        <div key="main">
                            <p>Button types have semantic meaning.  <i>Primary</i>, <i>Secondary</i>, and <i>Default</i> buttons usually are based on the colors of the app.</p>
                            <dl>
                                <dt><i>Primary</i> buttons are used to guide the user through the recommended flow.</dt>
                                <dt><i>Secondary</i> buttons are used similar but when <i>Primary</i> already exists.</dt>
                                <dt><i>Default</i> buttons are used for all other buttons.</dt>
                            </dl>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button variant="default">Default</Button>
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                </div>
                            </Panel>

                            <p>Other buttons could have colored based on special meaning such as, <i>Danger</i> or <i>Success</i></p>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="success">Success</Button>
                                </div>
                            </Panel>

                            <h2>Size</h2>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button size="small">Button</Button>
                                    <Button size="medium">Button</Button>
                                    <Button size="large">Button</Button>
                                </div>
                            </Panel>

                            <h2>Block</h2>
                            <Panel>
                                <div className={s.buttonsVert}>
                                    <Button isBlock size="small" className={s.stackButton}>Button</Button>
                                    <Button isBlock className={s.stackButton}>Button</Button>
                                    <Button isBlock size="large" className={s.stackButton}>Button</Button>
                                </div>
                            </Panel>


                            <h2>Disabled</h2>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button disabled variant="default">Default</Button>
                                    <Button disabled variant="primary">Primary</Button>
                                    <Button disabled variant="secondary">Secondary</Button>
                                    <Button disabled variant="danger">Default</Button>
                                    <Button disabled variant="success">Success</Button>
                                </div>
                            </Panel>

                            <h2>Icon Buttons</h2>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button>
                                        <FaCopy />  Copy
                                    </Button>
                                    <Button>
                                        <FaCut />  Cut
                                    </Button>
                                    <Button>
                                        <FaTrash />  Delete
                                    </Button>
                                    <Button>
                                        <FaCloudUpload />  Upload
                                    </Button>
                                </div>
                            </Panel>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button>
                                        Copy <FaCopy />
                                    </Button>
                                    <Button>
                                        Cut <FaCut />
                                    </Button>
                                    <Button>
                                        Delete <FaTrash />
                                    </Button>
                                    <Button>
                                        Upload <FaCloudUpload />
                                    </Button>
                                </div>
                            </Panel>

                            <h3>Loading Buttons</h3>
                            <Panel>
                                <div className={s.buttonsHor}>
                                    <Button>
                                        <FaSpinner /> Loading
                                    </Button>
                                </div>
                            </Panel>
                            <Panel>
                                <Button onClick={this.simulateUploadForButtonDemo}>
                                    {this.getInnerButton()}
                                </Button>
                            </Panel>


                            <Hr />

                            <h2>Form Buttons</h2>

                            Submit and reset buttons dont need a11y information.  The value attribute will be read by screen readers, thus these should be set.  Note: these have not been made components yet.
                            <Code
                                text={`
<input type="submit" name="submit" value="Submit Search">
<input type="reset" name="reset" value="Reset">
                                    `.trim()}
                            />

                            <Hr />

                            <h2>Button Groups</h2>
                            <p>Button Groups display a group of buttons inline.  Buttons only raise actions as opposed to arrays of buttons that usually represent data and data selection.</p>

                            <Panel>
                                <h3>Horizontal</h3>
                                <ButtonGroup
                                    buttons={[
                                        {
                                            text: 'Button 1',
                                        },
                                        {
                                            text: 'Button 2',
                                        },
                                        {
                                            text: 'Button 3',
                                        },
                                    ]}
                                />
                            </Panel>
                            <Panel>
                                <h3>Vertical</h3>
                                <ButtonGroup
                                    isVert
                                    buttons={[
                                        {
                                            text: 'Button 1',
                                        },
                                        {
                                            text: 'Button 2',
                                        },
                                        {
                                            text: 'Button 3',
                                        },
                                    ]}
                                />
                            </Panel>


                            <h2>Toggle Button (text)</h2>
                            <p>Toggle Buttons turn a state on or off.</p>

                            <Panel>
                                <ToggleTextButton
                                    model={this.state.toggleButtonState}
                                    trueText="close"
                                    falseText="open"
                                    onClick={this.handleToggleButtonClick}
                                />
                            </Panel>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Buttons);
