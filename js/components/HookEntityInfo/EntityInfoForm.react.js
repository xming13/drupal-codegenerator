var React = require('react');
var HookEntityInfoActions = require('../../actions/HookEntityInfoActions');
var _ = require('underscore');

var mui = require('material-ui');
var TextField = mui.TextField;

var ERROR_TEXT_REQUIRED = 'This field is required.';

var EntityInfoForm = React.createClass({
    getInitialState: function() {
        return _.extend(this.props.entityModel,
            {
                errorTextModuleName: ERROR_TEXT_REQUIRED,
                errorTextBaseTable: ERROR_TEXT_REQUIRED,
                errorTextLabel: ERROR_TEXT_REQUIRED
            });
    },

    componentDidMount: function() {
        this.setState({errorTextModuleName: this.refs.txtModuleName.getValue() == '' ? ERROR_TEXT_REQUIRED : ''});
        this.setState({errorTextBaseTable: this.refs.txtBaseTable.getValue() == '' ? ERROR_TEXT_REQUIRED : ''});
        this.setState({errorTextLabel: this.refs.txtLabel.getValue() == '' ? ERROR_TEXT_REQUIRED : ''});
        this.refs.txtModuleName.focus();
    },

    handleChangeModuleName: function() {
        this.setState({errorTextModuleName: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookEntityInfoActions.updateEntityModel({moduleName: event.target.value});
    },

    handleChangeBaseTable: function() {
        this.setState({errorTextBaseTable: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookEntityInfoActions.updateEntityModel({baseTable: event.target.value});
    },

    handleChangeLabel: function() {
        this.setState({errorTextLabel: event.target.value == '' ? ERROR_TEXT_REQUIRED : ''});
        HookEntityInfoActions.updateEntityModel({label: event.target.value});
    },

    render: function() {
        return (
            <div className='form-hook-entity-info col-sm-7'>
                <TextField
                    ref='txtModuleName'
                    onChange={this.handleChangeModuleName}
                    defaultValue={this.state.moduleName}
                    errorText={this.state.errorTextModuleName}
                    floatingLabelText='Module Name'/>

                <br/>

                <TextField
                    ref='txtBaseTable'
                    onChange={this.handleChangeBaseTable}
                    defaultValue={this.state.baseTable}
                    errorText={this.state.errorTextBaseTable}
                    floatingLabelText='Base Table'/>

                <br/>

                <TextField
                    ref='txtLabel'
                    onChange={this.handleChangeLabel}
                    defaultValue={this.state.label}
                    errorText={this.state.errorTextLabel}
                    floatingLabelText='Label'/>
            </div>
        );
    }
});

module.exports = EntityInfoForm;