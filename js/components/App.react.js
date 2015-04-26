var React = require('react');
var Header = require('./Header.react');
var HookEntityInfoApp = require('./HookEntityInfo/HookEntityInfoApp.react');
var HookSchemaApp = require('./HookSchema/HookSchemaApp.react');

var App = React.createClass({
    getInitialState: function() {
        return {
            appIndex: 0
        };
    },

    showApp: function(index) {
        this.setState({appIndex: index});
    },

    render: function() {
        var subApp;
        switch (this.state.appIndex) {
            case 0:
                subApp = <HookSchemaApp/>;
                break;
            case 1:
                subApp = <HookEntityInfoApp/>;
                break;
            default:
                break;
        }
        return (
            <div>
                <Header showApp={this.showApp}/>
                {subApp}
            </div>
        );
    }
});

module.exports = App;