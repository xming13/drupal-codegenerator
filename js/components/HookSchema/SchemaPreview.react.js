var React = require('react');
var SchemaPreviewField = require('./SchemaPreviewField.react.js');

var _ = require('underscore');
var ReactZeroClipboard = require('react-zeroclipboard');
var hljs = require('highlight.js');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var Snackbar = mui.Snackbar;

var SchemaPreview = React.createClass({
    componentDidMount: function() {
        var codeBlock = this.refs.code.getDOMNode();
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    componentDidUpdate: function() {
        var codeBlock = this.refs.code.getDOMNode();
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    getCopiedText: function() {
        var code = this.refs.code.getDOMNode();
        return code ? code.textContent : '';
    },

    clickCopy: function() {
        this.refs.snackbar.show();
    },

    render: function() {
        var schemaModel = this.props.schemaModel;

        var schemaPreviewFields = schemaModel.tableFields.map(function(tableField, index) {
            return (<SchemaPreviewField tableField={tableField} key={index}/>);
        });

        var indexes = _.map(schemaModel.tableFields, function(tableField) {
            return "      '" + tableField.fieldName + "' => array('" + tableField.fieldName + "'),\n"
        }).join('');

        var primaryKeys = _.map(_.where(schemaModel.tableFields, {type: 'serial'}), function(tableField) {
            return "'" + tableField.fieldName + "'";
        }).join(', ');

        return (
            <div className='hook-schema-code'>
                <pre>
                    <ReactZeroClipboard getText={this.getCopiedText}>
                        <IconButton className='copy' iconClassName='mdi mdi-content-copy' tooltip="Copy" onClick={this.clickCopy}/>
                    </ReactZeroClipboard>
                    <code className='php' ref='code'>
                        {'/**\n'}
                        {' * Implements hook_schema().\n'}
                        {' */\n'}
                        {'function '}{schemaModel.moduleName}{'_schema() {\n'}
                        {'  $schema[\''}{schemaModel.tableName}{'\'] = array(\n'}
                        {'    \'description\' => \''}{schemaModel.tableDescription}{'\',\n'}
                        {'    \'fields\' => array(\n'}
                        {schemaPreviewFields}
                        {'    ),\n'}
                        {'    \'indexes\' => array(\n'}
                        {indexes}
                        {'    ),\n'}
                        {'    \'primary key\' => array('}{primaryKeys}{'),\n'}
                        {'  );\n'}
                        }
                    </code>
                </pre>
                <Snackbar
                    ref='snackbar'
                    className='copied'
                    message='Copied!'/>
            </div>
        );
    }
});

module.exports = SchemaPreview;