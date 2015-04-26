var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var SchemaFormField = require('./SchemaFormField.react');

var KeyboardJS = require('keyboardjs');
var _ = require('underscore');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var SchemaFormFieldList = React.createClass({
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
        KeyboardJS.on('ctrl + alt + d', function() {
            if (!_.isEmpty(self.props.tableFields)) {
                var newestId = _.max(_.pluck(self.props.tableFields, 'id'));
                HookSchemaActions.destroy(newestId);
            };
        });
    },

    componentWillUnmount: function() {
        KeyboardJS.clear('ctrl + alt + i');
        KeyboardJS.clear('ctrl + alt + s');
        KeyboardJS.clear('ctrl + alt + v');
        KeyboardJS.clear('ctrl + alt + d');
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
                <SchemaFormField tableField={tableField} key={index} />
            );
        });

        return (
            <div>
                <RaisedButton label='+ varchar' className='btn-field-varchar' onClick={this.clickAddVarcharField}/>
                <RaisedButton label='+ int' className='btn-field-int' onClick={this.clickAddIntField}/>
                <RaisedButton label='+ serial' className='btn-field-serial' onClick={this.clickAddSerialField}/>

                <br/>

                {renderedTableFields}
            </div>
        );
    }
});

module.exports = SchemaFormFieldList;