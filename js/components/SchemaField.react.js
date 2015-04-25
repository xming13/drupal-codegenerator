var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');

var SchemaField = React.createClass({
    getInitialState: function() {
        return {
            tableFields: this.props.tableFields
        };
    },
    clickAddVarcharField: function() {
        HookSchemaActions.create(HookSchemaConstants.FIELD_TYPE_VARCHAR);
    },
    clickAddIntField: function() {
        HookSchemaActions.create(HookSchemaConstants.FIELD_TYPE_INT);
    },
    clickAddSerialField: function() {
        HookSchemaActions.create(HookSchemaConstants.FIELD_TYPE_SERIAL);
    },
    handleChangeUpdateField: function(event, id) {
        console.log('event', event);
        console.log('id', id);
        HookSchemaActions.update(id, {fieldName: event.target.value});
    },
    render: function() {
        var handleChangeUpdateField = function(id, event) {
            HookSchemaActions.update(id, {fieldName: event.target.value});
        };

        var renderedTableFields = this.props.tableFields.map(function(tableField, index) {
            var handleChangeUpdate = handleChangeUpdateField.bind(this, tableField.id);
            return (
                <Input type='text' key={index} label='Name' onChange={handleChangeUpdate} />
            );
        });

        return (
            <div>
                <Button onClick={this.clickAddVarcharField}>Add Varchar Field</Button>
                <Button onClick={this.clickAddIntField}>Add Int Field</Button>
                <Button onClick={this.clickAddSerialField}>Add Serial Field</Button>
                {renderedTableFields}
            </div>
        );
    }
});

module.exports = SchemaField;