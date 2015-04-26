var React = require('react');
var EntityInfoForm = require('./EntityInfoForm.react');
var EntityInfoPreview = require('./EntityInfoPreview.react');

var HookEntityInfoApp = React.createClass({
    getInitialState: function() {
        return {
            entityModel: {
                moduleName: 'moduleName',
                label: 'label',
                baseTable: 'baseTable'
            }
        };
    },

    render: function() {
        return (
            <section className='hook-entity-info-container'>
                <EntityInfoForm entityModel={this.state.entityModel} />
                <EntityInfoPreview entityModel={this.state.entityModel} />
            </section>
        );
    }
});

module.exports = HookEntityInfoApp;