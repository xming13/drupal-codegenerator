var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var Input = require('react-bootstrap/lib/Input');
var SchemaField = require('./SchemaField.react');

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
                <Input type='text' value={this.state.tableName}
                    label='Table Name'
                    onChange={this.handleChangeTableName} />
                <Input type='text' value={this.state.tableDescription}
                    label='Table Description'
                    onChange={this.handleChangeTableDescription} />
                <SchemaField tableFields={this.state.tableFields}/>
            </div>
        );
    }
});

module.exports = SchemaForm;