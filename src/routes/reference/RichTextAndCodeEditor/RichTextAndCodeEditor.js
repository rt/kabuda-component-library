import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RichTextAndCodeEditor.css';
import cx from 'classnames';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import RichTextEditor from '../../../components/RichTextEditor';
import CodeEditor from '../../../components/CodeEditor';
import Markdown from '../../../components/Markdown';
import Tabs from '../../../components/Tabs';

export class RichTextAndCodeEditor extends Base {
    constructor(props) {
        super(props);

        this.state = {
            source: `
# Heading1

This is probably useful if you have many \`.md\` documents (would need to resolve them at the router level)
Not everything, such as \`<code>\` are the same styling (even with the base stuff)

## Heading2

List
- Item 1
- Item 2

Code
\`\`\`
sudo diskutil unmountDisk /dev/diskN
sudo dd if=~/rpi-workshop.img of=/dev/rdiskN bs=1m
\`\`\`

Link to [Pebble Fields](http://www.pebblefields.com).  

			`,
            currentTab: 'richText',
        };

        this.handleTabClick = key => this.setState({ currentTab: key });
        this.handleCodeEditorChange = val => this.setState({ source: val });
    }

    getView() {
        switch (this.state.currentTab) {
        case 'richText':
            return (
                <Section title="">
                    <SubSection>
                        <div key="main">
								uses <a target="_blank" href="https://draftjs.org/">Draft.js</a><br />
                            <div className={cx(s.richTextEditor)}>
                                <RichTextEditor />
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            );
            break;
        case 'markdown':
            return (
                <Section title="">
                    <SubSection>
                        <div key="main">
								uses <a target="_blank" href="https://github.com/rexxars/react-markdown">react-markdown</a><br />
                            <Markdown
                                source={this.state.source}
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            );
            break;

        case 'code':
            return (
                <Section title="">
                    <SubSection>
                        <div key="main">
                                uses <a target="_blank" href="https://github.com/securingsincity/react-ace">react-ace</a><br />
                            <CodeEditor
                                onChange={this.handleCodeEditorChange}
                                source={this.state.source}
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            );
            break;
        }
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Tabs
                    array={[
                        { text: 'Rich Text', key: 'richText' },
                        { text: 'Markdown', key: 'markdown' },
                        { text: 'Code', key: 'code' },
                    ]}
                    keyPath="key"
                    textPath="text"
                    currentSelection={this.state.currentTab}
                    onClick={this.handleTabClick}
                />
                {this.getView()}
            </div>
        );
    }
}

export default withStyles(s)(RichTextAndCodeEditor);
