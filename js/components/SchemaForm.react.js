var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');

var SchemaForm = React.createClass({
    getInitialState: function() {
        return this.props.schemaModel;
    },
    handleChangeTableName: function(event) {
        var schemaModel = this.props.schemaModel;
        schemaModel.tableName = event.target.value;
        this.setState(schemaModel);
        HookSchemaActions.updateSchema(schemaModel);
    },
    handleChangeTableDescription: function(event) {
        var schemaModel = this.props.schemaModel;
        schemaModel.tableDescription = event.target.value;
        this.setState(schemaModel);
        HookSchemaActions.updateSchema(schemaModel);
    },
    render: function() {
        return (
            <div className='form'>
            Table Name: <input type='text' value={this.state.tableName} onChange={this.handleChangeTableName} />
                <br/>
            Description: <input type='text' value={this.state.tableDescription} onChange={this.handleChangeTableDescription} />
            </div>
        );
    }
});

module.exports = SchemaForm;