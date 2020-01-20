import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Images.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Image from '../../../components/Image';
import AccessibilityNote from '../AccessibilityNote';

export class Images extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="">
                    <SubSection>
                        <div key="main">
                            <div className={s.panel}>
                                <p>Images expand up to its own size.</p>
                                <Image src="http://lorempixel.com/400/200/transport" alt="Picture of transportation" />
                            </div>

                            <h3>Responsive</h3>
                            <p>Responsive images expand to its parent container size</p>
                            <div className={s.row}>
                                <div className={cx(s.column, s['column-10'])}>
                                    <Image responsive="width" src="http://lorempixel.com/400/200/sports/1" alt="Picture of sports" />
                                </div>
                                <div className={cx(s.column, s['column-40'])}>
                                    <Image responsive="width" src="http://lorempixel.com/400/200/sports/1" alt="Picture of sports" />
                                </div>
                                <div className={cx(s.column, s['column-50'])}>
                                    <Image responsive="width" src="http://lorempixel.com/400/200/sports/1" alt="Picture of sports" />
                                </div>
                            </div>

                            <h3>Custom</h3>
                            <p>Use custom images to enforce consistency.  Determine what combinations of helper classes you need to apply.</p>
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <Image type="card" src="http://placehold.it/350x150" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="sepia" src="http://placehold.it/350x150" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="opacity" src="http://placehold.it/350x150" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="circle" src="http://placehold.it/350x150" />
                                </div>
                            </div>
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <Image type="card" src="http://lorempixel.com/400/200/transport/1" alt="Picture of transportation" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="sepia" src="http://lorempixel.com/400/200/transport/1" alt="Picture of transportation" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="opacity" src="http://lorempixel.com/400/200/transport/1" alt="Picture of transportation" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image type="circle" src="http://lorempixel.com/400/200/transport/1" alt="Picture of transportation" />
                                </div>
                            </div>

                            <h3>Thumbnails</h3>
                            <p />
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb} responsive="width" src="http://lorempixel.com/400/200/city" alt="Picture of city" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb} responsive="width" src="http://lorempixel.com/400/200/city" alt="Picture of city" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb} responsive="width" src="http://lorempixel.com/400/200/city" alt="Picture of city" />
                                </div>
                            </div>
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb2} responsive="width" src="http://lorempixel.com/400/200/food" alt="Picture of food" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb2} responsive="width" src="http://lorempixel.com/400/200/food" alt="Picture of food" />
                                </div>
                                <div className={cx(s.column)}>
                                    <Image className={s.thumb2} responsive="width" src="http://lorempixel.com/400/200/food" alt="Picture of food" />
                                </div>
                            </div>
                        </div>
                        <div key="notes">
                            <AccessibilityNote>
                                All images should have an <code>alt</code> attribute the gives information about the image.
                            </AccessibilityNote>
                        </div>
                    </SubSection>
                </Section>
                <br /><br />

            </div>
        );
    }
}

export default withStyles(s)(Images);
