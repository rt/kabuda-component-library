import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './RichTextEditor.css';
import cx from 'classnames';
import Base from '../Base';
import {Editor, EditorState, RichUtils} from 'draft-js';

class RichTextEditor extends Base {

    constructor(props) {
        super(props);
        
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.handleChange = (editorState) => this.setState({editorState});
        this.logState = () => console.log(this.state.editorState.toJS());
        this.setDomEditorRef = ref => this.domEditor = ref;


        this.focus = () => this.domEditor.focus();

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onTab = this._onTab.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    componentDidMount(){
        this.domEditor.focus()
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.handleChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.handleChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.handleChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    render() {
        const {editorState} = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        //let className = cx(s.editor);
        //var contentState = editorState.getCurrentContent();
        //if (!contentState.hasText()) {
        //if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        //className += ' RichEditor-hidePlaceholder';
        //}
        //}
        return (
            <div>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={cx(s.editor)} onClick={this.focus}>
                    <Editor 
                        placeholder="Enter some text ..."
                        editorState={this.state.editorState} 
                        onChange={this.handleChange} 
                        ref={this.setDomEditorRef}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        handleKeyCommand={this.handleKeyCommand}
                        onTab={this.onTab}
                        spellCheck={true}
                    />
                </div>
            </div>
            );
            }
};

RichTextEditor.propTypes = {
};

export default withStyles(s)(RichTextEditor);





// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return cx(s.blockquote);
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className;
        if (this.props.active) {
            className = cx(s.styleButton);
        } else {
            className = cx(s.styleButton, s.activeButton);
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
{label: 'H1', style: 'header-one'},
{label: 'H2', style: 'header-two'},
{label: 'H3', style: 'header-three'},
{label: 'H4', style: 'header-four'},
{label: 'H5', style: 'header-five'},
{label: 'H6', style: 'header-six'},
{label: 'Blockquote', style: 'blockquote'},
{label: 'UL', style: 'unordered-list-item'},
{label: 'OL', style: 'ordered-list-item'},
{label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className={s.controls}>
            {BLOCK_TYPES.map((type) =>
            <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
            )}
        </div>
    );
};

const INLINE_STYLES = [
{label: 'Bold', style: 'BOLD'},
{label: 'Italic', style: 'ITALIC'},
{label: 'Underline', style: 'UNDERLINE'},
{label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className={s.controls}>
            {INLINE_STYLES.map(type =>
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
            )}
        </div>
    );
};

