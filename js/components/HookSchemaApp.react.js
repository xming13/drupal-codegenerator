/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the HookSchemaStore and passes the new data to its children.
 */

var React = require('react');
var HookSchemaStore = require('../stores/HookSchemaStore');

var SchemaForm = require('./SchemaForm.react');
var SchemaPreview = require('./SchemaPreview.react');

function getSchemaModelState() {
    return {
        schemaModel: HookSchemaStore.getSchemaModel()
    }
}

var HookSchemaApp = React.createClass({
    getInitialState: function() {
        return getSchemaModelState();
    },

    componentDidMount: function() {
        HookSchemaStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        HookSchemaStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className='schema'>
                <SchemaForm schemaModel={this.state.schemaModel} />
                <SchemaPreview schemaModel={this.state.schemaModel} />
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getSchemaModelState());
    }
});

module.exports = HookSchemaApp;
