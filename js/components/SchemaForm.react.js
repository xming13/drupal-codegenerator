var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var Input = require('react-bootstrap/lib/Input');
var SchemaFormField = require('./SchemaFormField.react');

var SchemaForm = React.createClass({
    getInitialState: function() {
        return this.props.schemaModel;
    },
    handleChangeTableName: function(event) {
        HookSchemaActions.updateTableName(event.target.value);
    },
    handleChangeTableDescription: function(event) {
        HookSchemaActions.updateTableDescription(event.target.value);
    },
    render: function() {
        return (
            <div id='form-hook-entity-info' className='col-sm-7'>
                <Input id='text-table-name' type='text' value={this.state.tableName}
                    label='Table Name' placeholder='Your table name'
                    onChange={this.handleChangeTableName} />
                <Input type='text' value={this.state.tableDescription}
                    label='Table Description' placeholder='Description'
                    onChange={this.handleChangeTableDescription} />
                <SchemaFormField tableFields={this.state.tableFields}/>
            </div>
        );
    }
});

module.exports = SchemaForm;