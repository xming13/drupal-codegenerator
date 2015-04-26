var React = require('react');
var HookSchemaConstants = require('../../constants/HookSchemaConstants');

var SchemaPreviewField = React.createClass({
    render: function() {
        var s6 = '      ';
        var s8 = '        ';

        switch (this.props.tableField.type) {
            case HookSchemaConstants.FIELD_TYPE_VARCHAR:
                return (
                    <span>
                        {s6}'{this.props.tableField.fieldName}' => array({'\n'}
                        {s8}'description' => '{this.props.tableField.description}',{'\n'}
                        {s8}'type' => '{this.props.tableField.type}',{'\n'}
                        {s8}'length' => {this.props.tableField.length},{'\n'}
                        {s8}'not null' => {this.props.tableField['not null'] ? 'TRUE' : 'FALSE'},{'\n'}
                        {s8}'default' => '{this.props.tableField.default}',{'\n'}
                        {s6}),{'\n'}
                    </span>
                );

            case HookSchemaConstants.FIELD_TYPE_INT:
                return (
                    <span>
                        {s6}'{this.props.tableField.fieldName}' => array({'\n'}
                        {s8}'description' => '{this.props.tableField.description}',{'\n'}
                        {s8}'type' => '{this.props.tableField.type}',{'\n'}
                        {s8}'unsigned' => {this.props.tableField.unsigned ? 'TRUE' : 'FALSE'},{'\n'}
                        {s8}'not null' => {this.props.tableField['not null'] ? 'TRUE' : 'FALSE'},{'\n'}
                        {s8}'default' => {this.props.tableField.default},{'\n'}
                        {s6}),{'\n'}
                    </span>
                );

            case HookSchemaConstants.FIELD_TYPE_SERIAL:
                return (
                    <span>
                        {s6}'{this.props.tableField.fieldName}' => array({'\n'}
                        {s8}'description' => '{this.props.tableField.description}',{'\n'}
                        {s8}'type' => '{this.props.tableField.type}',{'\n'}
                        {s8}'unsigned' => {this.props.tableField.unsigned ? 'TRUE' : 'FALSE'},{'\n'}
                        {s8}'not null' => {this.props.tableField['not null'] ? 'TRUE' : 'FALSE'},{'\n'}
                        {s6}),{'\n'}
                    </span>
                );

            default:
                console.log('Invalid field type in SchemaPreviewField render');
                return (<span></span>);
        }
    }
});

module.exports = SchemaPreviewField;