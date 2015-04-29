var React = require('react');
var HookSchemaActions = require('../../actions/HookSchemaActions');
var SchemaFormFieldList = require('./SchemaFormFieldList.react.js');

var _ = require('underscore');

var Input = require('react-bootstrap/lib/Input');
var mui = require('material-ui');
var TextField = mui.TextField;

var ERROR_TEXT_REQUIRED = 'This field is required.';

var SchemaForm = React.createClass({
    getInitialState: function() {
        return {
            errorTextTableName: ERROR_TEXT_REQUIRED,
            errorTextModuleName: ERROR_TEXT_REQUIRED
        };
    },

    componentDidMount: function() {
        this.setState({errorTextTableName: this.refs.txtTableName.getValue() == '' ? ERROR_TEXT_REQUIRED : ''})
        this.setState({errorTextModuleName: this.refs.txtModuleName.getValue() == '' ? ERROR_TEXT_REQUIRED : ''})
        this.refs.txtModuleName.focus();
    },

    handleChangeModuleName: function(event) {
        this.setState({errorTextModuleName: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookSchemaActions.updateSchema({moduleName: event.target.value});
    },

    handleChangeTableName: function(event) {
        this.setState({errorTextTableName: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookSchemaActions.updateSchema({tableName: event.target.value});
    },

    handleChangeTableDescription: function(event) {
        HookSchemaActions.updateSchema({tableDescription: event.target.value});
    },

    render: function() {
        var schemaModel = this.props.schemaModel;
        return (
            <div className='form-hook-schema col-sm-7'>
                <TextField
                    ref='txtModuleName'
                    defaultValue={schemaModel.moduleName}
                    errorText={this.state.errorTextModuleName}
                    floatingLabelText='Module Name'
                    onChange={this.handleChangeModuleName} />

                <br/>

                <TextField
                    ref='txtTableName'
                    defaultValue={schemaModel.tableName}
                    errorText={this.state.errorTextTableName}
                    floatingLabelText='Table Name'
                    onChange={this.handleChangeTableName} />

                <br/>

                <TextField
                    defaultValue={schemaModel.tableDescription}
                    floatingLabelText='Description'
                    onChange={this.handleChangeTableDescription} />

                <br/>

                <SchemaFormFieldList tableFields={schemaModel.tableFields}/>
            </div>
        );
    }
});

module.exports = SchemaForm;