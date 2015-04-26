var React = require('react');
var SchemaPreviewField = require('./SchemaPreviewField.react.js');
var _ = require('underscore');
var ReactZeroClipboard = require('react-zeroclipboard');
var mui = require('material-ui');
var IconButton = mui.IconButton;
var Snackbar = mui.Snackbar;

var SchemaPreview = React.createClass({
    getCopiedText: function() {
        var code = document.querySelector('.hook-schema-code code');
        return code.textContent;
    },

    clickCopy: function() {
        this.refs.snackbar.show();
    },

    render: function() {
        var schemaPreviewFields = this.props.schemaModel.tableFields.map(function(tableField, index) {
            return (<SchemaPreviewField tableField={tableField} key={index}/>);
        });

        var indexes = _.map(this.props.schemaModel.tableFields, function(tableField) {
            return "      '" + tableField.fieldName + "' => array('" + tableField.fieldName + "'),\n"
        }).join('');

        var primaryKeys = _.map(_.where(this.props.schemaModel.tableFields, {type: 'serial'}), function(tableField) {
            return "'" + tableField.fieldName + "'";
        }).join(', ');

        return (
            <div className='hook-schema-code'>
                <pre>
                    <ReactZeroClipboard getText={this.getCopiedText}>
                        <IconButton className='copy' iconClassName='mdi mdi-content-copy' tooltip="Copy" onClick={this.clickCopy}/>
                    </ReactZeroClipboard>
                    <code className='php' ref='code'>
                        {'function hook_schema() {\n'}
                        {'  $schema[\''}{this.props.schemaModel.tableName}{'\'] = array(\n'}
                        {'    \'description\' => \''}{this.props.schemaModel.tableDescription}{'\',\n'}
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