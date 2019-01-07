import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './CodeEditor.css';
import cx from 'classnames';
import Base from '../Base';

import brace from 'brace';
import AceEditor from 'react-ace'; //not stable with npm install
 
import 'brace/mode/java';
import 'brace/theme/github';

class CodeEditor extends Base {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val) {
        this.props.onChange && this.props.onChange(val);
    }

    //unmanaged
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
		return (
			<div data-e2e={this.e2e()}>
				<AceEditor
					mode="md"
					theme="monokai"
					onChange={this.handleChange}
					name="ace-editor"
					editorProps={{$blockScrolling: true}}
					value={this.props.source}
				/>
				<div id="ace-editor" />
			</div>
		);
    }
};

CodeEditor.propTypes = {
};

export default withStyles(s)(CodeEditor);


	//setupEditor: function(id, aceDiv) {
		//var that = this;
		//var theme = this.props.preferences.editorTheme;
		//var editor = this.editors[id] = ace.edit(aceDiv);
		//editor.setTheme('ace/theme/' + theme);
		////editor.setReadOnly(true);  // false to make it editable
		//editor.setShowPrintMargin(false);
		//editor.getSession().setTabSize(2);

		//this.enableSnipplets(editor);
		//this.enableCompletions(editor);
		//this.setKeyBinding(editor);

		//aceDiv.ondblclick = this._onDblClick.bind(this);
		//editor.on('blur', this._update.bind(this));

		//var ext = this.props.selectedDoc.name.split('.').pop();
		//var code = this.props.selectedDoc.contents;
		//switch(ext) {
			//case 'js':
				//mode = 'javascript';
				//break;
			//case 'json':
				//mode = 'json';
				////code = vkbeautify.json(code);
				//break;
			//case 'xml':
				//mode = 'xml';
				////code = vkbeautify.xml(code);
				//break;
			//case 'css':
				//mode = 'css';
				////code = vkbeautify.css(code);
				//break;
			//case 'md':
				//mode = 'markdown';
				//break;
			//case 'less':
				//mode = 'less';
				//break;
			//default:
				//mode = ext;
		//}
		//editor.getSession().setMode('ace/mode/' + mode);

	//},

	//getEditor: function(selectedDoc) {

		//var id = selectedDoc.path === '/' ? selectedDoc.path + selectedDoc.name : selectedDoc + '/' + selectedDoc.name;
		//id = id.replace(/\//g, '$'); //xpath doesn't like
		//id = id.replace(/\./g, '$'); //xpath doesn't like

		//if (!this.editors[id]) {
			//var container = this.getDOMNode();
			//container.setAttribute('data-e2e', 'aceEditor');
			//var aceDiv = this.elements[id] = this.createDiv();
			//aceDiv.setAttribute('data-e2e', id);

			//container.appendChild(aceDiv);
			//this.setupEditor(id, aceDiv);
			//var that = this;
			//var run = setInterval(function() {
				//var input = aceDiv.querySelector('.ace_text-input');
				//if (input) {
					//jQuery(input).bind("keyup keydown", function(e){
						//if (e.ctrlKey && e.keyCode == 80){
							//DocumentActions.focusAutoComplete();
						//}
					//});
					//clearInterval(run);
				//}   
			//}, 50);
		//}
		//if (this.currentEle) {
			//this.currentEle.style.visibility = 'hidden';
		//}
		//this.currentEle = this.elements[id];
		//this.currentEle.style.visibility = 'visible';
		//this.currentEditor = this.editors[id];
		//return this.currentEditor;
	//},
	
	//* @return {object} 
	//render: function() {
		//return (
			//<div style={{position:'absolute',left:'0px',right:'0px',top:'0px',bottom:'0px'}} />
		//);
	//},

	//enableSnipplets: function(editor) {

		//var that = this;
		//ace.require("ace/lib/net").loadScript("/bower_components/ace-builds/src-noconflict/ext-emmet.js", function() { 

			//var snippetManager = ace.require("ace/snippets").snippetManager; 
			//var config = ace.require("ace/config"); 

			//editor.setOptions({enableSnippets: true});

			//ace.config.loadModule("ace/snippets/javascript", function(m) { 
				//[> if (m) { 
				////snippetManager.files.javascript = m; 
				////m.snippetText += mySnippetText; // if you have snippets in the  ace snippet format 
				////m.snippets = snippetManager.parseSnippetFile(m.snippetText); 

				//// or do this if you already have them parsed m.snippets.push({ content: "${1:class_name}.prototype.${2:method_name} =  function(${3:first_argument}) {    ${4:// body...}", name: "proto", tabTrigger: "proto" }); snippetManager.register(m.snippets, m.scope); } */  
			//}); 
		//});
	//},

	//enableCompletions: function(editor) {
		//var that = this;
		//ace.require("ace/lib/net").loadScript("/bower_components/ace-builds/src-noconflict/ext-language_tools.js", function() { 
			//var langTools = ace.require("ace/ext/language_tools");
			//editor.setOptions({enableBasicAutocompletion: true});
			//// uses http://rhymebrain.com/api.html
			//var completer = {
				//getCompletions: function(editor, session, cursor, prefix, callback) {

					//var toks = session.getTokens(cursor.row);
					//var tok = session.getTokenAt(cursor.row, cursor.column);
					//var row = session.getLine(cursor.row);
					//var rowTillCursor = row.substring(0, cursor.column);
					//var afterRefIndex = rowTillCursor.lastIndexOf(" ref=\"") + 6;
					//var startTagIndex = rowTillCursor.lastIndexOf("<");
					//if (afterRefIndex > startTagIndex && afterRefIndex <= cursor.column && startTagIndex != -1) { 
						//var endTagIndex = row.indexOf(">", startTagIndex);
						//if (endTagIndex >= cursor.column) {
							////we are in the start tag/attributes
							//var tagName = row.substring(startTagIndex + 1, row.indexOf(" ", startTagIndex));

							//var refVal = rowTillCursor.substring(afterRefIndex, cursor.column);

							////records like this > 
							//var data = [{name: peb.getTagName(), value: peb.getTagName() + delimiter, score: 100000, meta: meta}];
							//callback(null, data);

						//}
					//}

				//}
			//}
			//langTools.addCompleter(completer);
		//}) 

	//},

	//setKeyBinding: function(editor) {
		//var that = this;
		//switch (this.props.preferences.editoryKeyBinding) {
			//case 'vim':
				//ace.require("ace/lib/net").loadScript("/bower_components/ace-builds/src-noconflict/keybinding-vim.js", function() { 
					//editor.setKeyboardHandler(ace.require("ace/keyboard/vim").handler); 
				//}) 
				//break;
			//case 'emacs':
				//ace.require("ace/lib/net").loadScript("/bower_components/ace-builds/src-noconflict/keybinding-emacs.js", function() { 
					//editor.setKeyboardHandler(ace.require("ace/keyboard/emacs").handler); 
				//}) 
				//break;
			//default:
		//}
	//},

	//_onDblClick: function() {
		//if (mode === "pxml") {
			//var range = this.currentEditor.getSelectionRange();
			//var text = this.currentEditor.getSession().getTextRange(range);
			//var cursor = this.currentEditor.selection.getCursor();
			//var row = this.currentEditor.getSession().getLine(cursor.row);

			//var rowToEndParen = row.substring(cursor.column, row.indexOf("\"", cursor.column));
			//var rowToBegParen = row.substring(0, cursor.column);
			//rowToBegParen = rowToBegParen.substring(rowToBegParen.lastIndexOf("\"") + 1);
			//var selection = rowToBegParen + rowToEndParen;

			//pebble.libs.standard.Module.topMod.item.layoutStateManager.setLayoutStateByDataPath(selection);
		//}
	//},

	//_update: function() {
		//var val = this.currentEditor.getValue(); // or session.getValue
		//var selectedDoc = this.props.selectedDoc;
		//DocumentActions.updateSelectedContents(selectedDoc.path, selectedDoc.name, val);
	//}

