var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var mui = require('material-ui');
var TextField = mui.TextField;
var Input = require('react-bootstrap/lib/Input');
var SchemaFormFields = require('./SchemaFormFields.react');
var _ = require('underscore');

var ERROR_TEXT_REQUIRED = 'This field is required.';

var SchemaForm = React.createClass({
    getInitialState: function() {
        return _.extend(this.props.schemaModel, {errorText: ERROR_TEXT_REQUIRED});
    },

    componentDidMount: function() {
        this.refs.textfieldName.focus();
    },

    handleChangeTableName: function(event) {
        this.state.errorText = event.target.value == '' ? ERROR_TEXT_REQUIRED : '';
        HookSchemaActions.updateTableName(event.target.value);
    },

    handleChangeTableDescription: function(event) {
        HookSchemaActions.updateTableDescription(event.target.value);
    },

    render: function() {
        return (
            <div className='form-hook-schema col-sm-7'>
                <TextField
                    defaultValue={this.state.tableName}
                    errorText={this.state.errorText}
                    floatingLabelText='Table Name'
                    ref='textfieldName'
                    onChange={this.handleChangeTableName} />

                <br/>

                <TextField
                    defaultValue={this.state.tableDescription}
                    floatingLabelText='Description'
                    onChange={this.handleChangeTableDescription} />

                <br/>

                <SchemaFormFields tableFields={this.state.tableFields}/>
            </div>
        );
    }
});

module.exports = SchemaForm;