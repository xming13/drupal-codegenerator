var React = require('react');
var HookEntityInfoStore = require('../../stores/HookEntityInfoStore');
var EntityInfoForm = require('./EntityInfoForm.react');
var EntityInfoPreview = require('./EntityInfoPreview.react');

function getEntityModelState() {
    return {
        entityModel: HookEntityInfoStore.getEntityModel()
    };
}

var HookEntityInfoApp = React.createClass({
    getInitialState: function() {
        return getEntityModelState();
    },

    componentDidMount: function() {
        HookEntityInfoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        HookEntityInfoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <section className='hook-entity-info-container'>
                <EntityInfoForm entityModel={this.state.entityModel} />
                <EntityInfoPreview entityModel={this.state.entityModel} />
            </section>
        );
    },

    /**
     * Event handler for 'change' events coming from the HookEntityInfoStore
     */
    _onChange: function() {
        this.setState(getEntityModelState());
    }
});

module.exports = HookEntityInfoApp;