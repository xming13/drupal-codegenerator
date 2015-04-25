/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the HookSchemaStore and passes the new data to its children.
 */

var React = require('react');
var HookSchemaStore = require('../stores/HookSchemaStore');
var hljs = require('highlight.js');

var Header = require('./Header.react');
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
        hljs.highlightBlock(document.querySelector('pre code'));
        document.getElementById('text-table-name').focus();
    },

    componentWillUnmount: function() {
        HookSchemaStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function() {
        hljs.highlightBlock(document.querySelector('pre code'));
        var focusInput = document.querySelector('.focus-input');
        if (focusInput) {
            focusInput.focus();
        }
    },

    render: function() {
        return (
            <div>
                <Header/>
                <section className='hook-entity-info'>
                    <SchemaForm schemaModel={this.state.schemaModel} />
                    <SchemaPreview schemaModel={this.state.schemaModel} />
                </section>
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
