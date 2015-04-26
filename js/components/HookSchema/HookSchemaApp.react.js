/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the HookSchemaStore and passes the new data to its children.
 */

var React = require('react');
var HookSchemaStore = require('../../stores/HookSchemaStore');
var Header = require('./../Header.react.js');
var SchemaForm = require('./SchemaForm.react.js');
var SchemaPreview = require('./SchemaPreview.react.js');

var _ = require('underscore');
var hljs = require('highlight.js');

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
        var codeBlock = document.querySelector('pre code');
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    componentWillUnmount: function() {
        HookSchemaStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function() {
        var codeBlock = document.querySelector('pre code');
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    render: function() {
        return (
            <section className='hook-schema-container'>
                <SchemaForm schemaModel={this.state.schemaModel} />
                <SchemaPreview schemaModel={this.state.schemaModel} />
            </section>
        );
    },

    /**
     * Event handler for 'change' events coming from the HookSchemaStore
     */
    _onChange: function() {
        this.setState(getSchemaModelState());
    }
});

module.exports = HookSchemaApp;
