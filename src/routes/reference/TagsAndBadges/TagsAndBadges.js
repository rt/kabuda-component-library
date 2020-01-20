import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './TagsAndBadges.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Badge from '../../../components/Badge';
import StatusTag from '../StatusTag';
import Chip from '../../../components/Chip';

export class TagsAndBadges extends Base {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getContactList = () => {
        const contacts = [
            {
                name: 'John',
                img: 'http://lorempixel.com/400/200/people',
            },
            {
                name: 'Joe',
                img: 'http://lorempixel.com/400/200/people',
            },
            {
                name: 'Sally',
                img: 'http://lorempixel.com/400/200/people',
            },
        ];

        return contacts.map(contact => (<Chip
            text={contact.name}
            img={contact.img}
        />));
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <p>Badges and Tags are inline-block elements that will be custom to your app.  Use <code>constency classes</code> as these are <code>nested</code> components.</p>
                <Section title="Tags">
                    <SubSection>
                        <div key="main">
                            <p>Tags mark an item or document for special information, a category, etc.  In reference, we use these.</p>
                            <div className={s.panel}>
                                <StatusTag status="done" />
                            </div>
                            <div className={s.panel}>
                                <StatusTag status="deprecated" />
                            </div>
                            <div className={s.panel}>
                                <StatusTag status="dev" />
                            </div>
                            <div className={s.panel}>
                                <StatusTag status="todo" />
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Badges">
                    <SubSection>
                        <div key="main">
                            <p>A badge tells the number of something</p>
                            <div className={cx(s.panel)}>oranges <Badge number="5" /></div>
                            <div className={cx(s.panel)}>apples <Badge number="10" /></div>
                            <div className={cx(s.panel)}>bananas <Badge number="50" /></div>
                            <div className={cx(s.panel)}>coconuts <Badge number="101" /></div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Chips">
                    <SubSection>
                        <div key="main">
                            <p>A chip allows you to create a simple inline list</p>
                            <div className={cx(s.panel)}>
                                {this.getContactList()}
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(TagsAndBadges);
