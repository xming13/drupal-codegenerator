var React = require('react');
var HookSchemaActions = require('../actions/HookSchemaActions');
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var KeyboardJS = require('keyboardjs');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');

var SchemaFormField = React.createClass({
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
        var handleChangeUpdateField = function(id, event) {
            HookSchemaActions.update(id, {fieldName: event.target.value});
        };

        var renderedTableFields = this.props.tableFields.map(function(tableField, index) {
            var handleChangeUpdate = handleChangeUpdateField.bind(this, tableField.id);
            return (
                <div className='col-sm-3' key={index}>
                    <Input type='text' label='Name' key={index} value={tableField.fieldName} onChange={handleChangeUpdate} className={tableField.focusInput ? 'focus-input' : ''} />
                </div>
            );
        });

        return (
            <div>
                <ButtonToolbar>
                    <Button bsSize='small' bsStyle='primary' onClick={this.clickAddVarcharField}>Add Varchar Field</Button>
                        <Button bsSize='small' bsStyle='primary' onClick={this.clickAddIntField}>Add Int Field</Button>
                        <Button bsSize='small' bsStyle='primary' onClick={this.clickAddSerialField}>Add Serial Field</Button>
                    </ButtonToolbar>
                    {renderedTableFields}
            </div>
        );
    }
});

module.exports = SchemaFormField;