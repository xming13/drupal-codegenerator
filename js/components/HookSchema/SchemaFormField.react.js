var React = require('react');
var HookSchemaActions = require('../../actions/HookSchemaActions');

var mui = require('material-ui');
var TextField = mui.TextField;
var IconButton = mui.IconButton;
var Paper = mui.Paper;

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
            this.refs.textfield.blur();
        }
    },

    clickDelete: function() {
        HookSchemaActions.destroy(this.props.tableField.id);
    },

    handleChangeUpdate: function(event) {
        this.setState({errorText: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookSchemaActions.update(this.props.tableField.id, {fieldName: event.target.value});
    },

    render: function() {
        var tableField = this.props.tableField;
        return (
            <div className='col-sm-4'>
                <Paper className={'paper-table-field paper-table-field-' + tableField.type} zDepth={2} innerClassName='paper-inner-container'>
                    <label>{tableField.type}</label>
                    <IconButton className='delete' iconClassName="mdi mdi-close" tooltip="Remove" onClick={this.clickDelete} />
                    <br/>
                    <TextField floatingLabelText='Field Name' defaultValue={tableField.fieldName}
                        onChange={this.handleChangeUpdate} ref='textfield'
                        errorText={this.state.errorText}
                        className={'input-small'}/>
                </Paper>
            </div>
        );
    }
});

module.exports = SchemaFormField;