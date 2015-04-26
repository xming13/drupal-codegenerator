var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var KeyboardJS = require('keyboardjs');
var SchemaFormField = require('./SchemaFormField.react');

var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Paper = mui.Paper;
var FontIcon = mui.FontIcon;

var SchemaFormFields = React.createClass({
    getInitialState: function() {
        return {
            tableFields: this.props.tableFields
        };
    },

    componentDidMount: function() {
        var self = this;
        KeyboardJS.on('ctrl + alt + i', function() {
            self.clickAddIntField();
        });
        KeyboardJS.on('ctrl + alt + s', function() {
            self.clickAddSerialField();
        });
        KeyboardJS.on('ctrl + alt + v', function() {
            self.clickAddVarcharField();
        });
    },

    componentWillUnmount: function() {
        KeyboardJS.clear('ctrl + alt + i');
        KeyboardJS.clear('ctrl + alt + s');
        KeyboardJS.clear('ctrl + alt + v');
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

    render: function() {
        var renderedTableFields = this.props.tableFields.map(function(tableField, index) {
            return (
                <div className='col-sm-4' key={index}>
                    <Paper className={'paper-table-field paper-table-field-' + tableField.type} zDepth={2} key={index} innerClassName='paper-inner-container'>
                        <label>{tableField.type}</label>

                        <br/>

                        <SchemaFormField tableField={tableField} />
                    </Paper>
                </div>
            );
        });

        return (
            <div>
                <RaisedButton label='+ varchar' secondary={true} onClick={this.clickAddVarcharField}/>
                <RaisedButton label='+ int' secondary={true} onClick={this.clickAddIntField}/>
                <RaisedButton label='+ serial' secondary={true} onClick={this.clickAddSerialField}/>

                <br/>

                {renderedTableFields}
            </div>
        );
    }
});

module.exports = SchemaFormFields;