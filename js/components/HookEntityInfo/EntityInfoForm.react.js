var React = require('react');
var _ = require('underscore');

var mui = require('material-ui');
var TextField = mui.TextField;

var ERROR_TEXT_REQUIRED = 'This field is required.';

var EntityInfoForm = React.createClass({
    getInitialState: function() {
        return _.extend(this.props.entityModel, {errorText: ERROR_TEXT_REQUIRED});
    },

    componentDidMount: function() {
        this.refs.txtModuleName.focus();
    },

    render: function() {
        return (
            <div className='form-hook-entity-info col-sm-7'>
                <TextField
                    ref='txtModuleName'
                    defaultValue={this.state.moduleName}
                    errorText={this.state.errorText}
                    floatingLabelText='Module Name'/>

                <br/>

                <TextField
                    defaultValue={this.state.label}
                    errorText={this.state.errorText}
                    floatingLabelText='Label'/>

                <br/>

                <TextField
                    defaultValue={this.state.baseTable}
                    errorText={this.state.errorText}
                    floatingLabelText='Base Table'/>
            </div>
        );
    }
});

module.exports = EntityInfoForm;