var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var mui = require('material-ui');
var TextField = mui.TextField;

var ERROR_TEXT_REQUIRED = 'This field is required.';

var SchemaFormField = React.createClass({
    getInitialState: function() {
        return {
            errorText: ERROR_TEXT_REQUIRED
        };
    },
    componentDidMount: function() {
        if (this.props.tableField.focusInput) {
           this.refs.textfield.focus();
        }
        else {
            this.refs.textfield.clear();
        }
    },
    handleChangeUpdate: function(event) {
        this.state.errorText = event.target.value == '' ? ERROR_TEXT_REQUIRED : '';
        HookSchemaActions.update(this.props.tableField.id, {fieldName: event.target.value});
    },
    render: function() {
        var tableField = this.props.tableField;
        return (
            <TextField floatingLabelText='Field Name' defaultValue={tableField.fieldName}
                onChange={this.handleChangeUpdate} ref='textfield'
                errorText={this.state.errorText}
                className={'input-small'}/>
        );
    }
});

module.exports = SchemaFormField;