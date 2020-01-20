import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Typography.css';
import Base from '../../../components/Base';
import Link from '../../../components/Link';
import Code from '../../../components/Code';
import Hr from '../../../components/Hr';
import AccessibilityNote from '../AccessibilityNote';
import Section from '../Section';
import SubSection from '../SubSection';
import DevNote from '../DevNote';
import BlockQuote from '../../../components/BlockQuote';
import Card from '../../../components/Card';
import Divider from '../../../components/Divider';
import loremIpsum from 'lorem-ipsum';

export class Typography extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        const getLoremIpsum = function () {
            return loremIpsum({
                count: 1,
                units: 'paragraphs',
                paragraphUpperBound: 3,
            });
        };

        const getCode = function () {
            return `
const foo = 1;
function foo() {
    return 'bar';
}
            `.trim();
        };

        const getMarkup = function () {
            return `
<Code
    text={getCode()}
/>
            `.trim();
        };
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Typography">
                    <SubSection>
                        <div key="main">
                            <p>
                                Type is all set with the rems, so font-sizes and spacial relationships can be responsively sized based on this document base font-size. You can change this but measurements are still base 10 though so, 5.0rem is equal to 50px.
                            </p>
                            <p>
                                The typography base is Segoe UI , set at 16rem (16px) over a 1.6 line height (24px).
                            </p>

                            <h2>Headings</h2>

                            <p>
                                Headings create a family of distinct sizes each with specific letter-spacing, line-height, and margins.  If possible, every page and modal should start with H1, followed by H2, and so on.
                            </p>

                            <h1>Heading <span className={s.textMedium}><code className={s.textMedium}>H1</code> 4.6rem (46px)</span></h1>
                            <h2>Heading <span className={s.textMedium}><code className={s.textMedium}>H2</code> 3.6rem (36px)</span></h2>
                            <h3>Heading <span className={s.textMedium}><code className={s.textMedium}>H3</code> 2.8rem (28px)</span></h3>
                            <h4>Heading <span className={s.textMedium}><code className={s.textMedium}>H4</code> 2.2rem (22px)</span></h4>
                            <h5>Heading <span className={s.textMedium}><code className={s.textMedium}>H5</code> 1.8rem (18px)</span></h5>
                            <h6>Heading <span className={s.textMedium}><code className={s.textMedium}>H6</code> 1.6rem (16px)</span></h6>

                            <h1>Heading <small>short description</small></h1>
                            <h2>Heading <small>short description</small></h2>
                            <p>This could also be a potential component</p>
                            <Code
                                text={`
<h1>Heading 
    <small>short description</small>
</h1>  
                                `.trim()}
                            />
                        </div>
                        <div key="notes">
                            <AccessibilityNote>
                                Organized headings will allow for easier navigation.  Try to have one H1 heading per page, near the top of the page.  If something needs to be higher, also for skipping to the content.  Also, have one per modal.
                            </AccessibilityNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Body Text and Other Standard Elements">
                    <SubSection>
                        <div key="main">
                            <strong>
                                &lt;p&gt;
                            </strong>
                            <p>This is a sample paragraph.</p>


                            <strong>
                                &lt;ul&gt;
                            </strong>
                            <ul>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ul>

                            <strong>
                                &lt;ol&gt;
                            </strong>
                            <ol>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </ol>

                            <strong>
                                &lt;dl&gt;
                            </strong>
                            <dl>
                                <li>one</li>
                                <li>two</li>
                                <li>three</li>
                            </dl>

                            <p>
                                Other inline elements like the following can be used freely.
                            </p>
                            <em>Emphasis</em><br />
                            <small>Small</small><br />
                            <strong>Strong</strong><br />
                            <u>Underline</u><br />
                            <code>const foo = null;</code>
                            <p>Color should be added with <Link to="/reference/colors">text color classes</Link></p>
                        </div>
                        <div key="notes">
                            <DevNote>
                                This is specified in base.css
                            </DevNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Wrapping Basic Element">
                    <SubSection>
                        <div key="main">
                            <p>Wrapping elements allows you to control the details of certain elements.</p>

                            <h3>Code</h3>
                            <p>this is code
                                <code>const foo = 1; </code>
                            </p>
                            <Code
                                text={getCode()}
                            />
                            <Code
                                text={getMarkup()}
                            />


                            <h3>BlockQuote</h3>
                            <p>Encapsulate blockquote to lock down a style, pattern, format, etc.</p>
                            <BlockQuote
                                text="Make things as simple as possible, but not simpler."
                                author="Albert Einstein"
                            />


                            <h3>Hr / Divider</h3>
                            <Hr />
                            <Divider>split</Divider>


                            <h3>Card</h3>
                            <p>A card puts anything in a <i>consistent shadow container</i></p>
                            <Card className={cx(s.container)}>
                                <h2>Title</h2>
                                <p>{getLoremIpsum()}</p>
                            </Card>

                            <Code
                                text={`
<Card>
    <h2>Title</h2>
    <p>...</p>
</Card>
                                `.trim()}
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Typography);
