var React = require('react');
var KeyboardJS = require('keyboardjs');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var IconButton = mui.IconButton;
var Dialog = mui.Dialog;

var Header = React.createClass({
    componentDidMount: function() {
        var self = this;
        KeyboardJS.on('ctrl + ?, ctrl + /', function() {
            self.clickShortcut();
        });
        KeyboardJS.on('esc', function() {
            self.refs.shortcut.dismiss();
            self.refs.info.dismiss();
        });
    },

    componentWillUnmount: function() {
        KeyboardJS.clear('ctrl + ?, ctrl + /');
        KeyboardJS.clear('esc');
    },

    handleMenuChange: function(e, selectedIndex, menuItem) {
        this.props.showApp(selectedIndex);
    },

    clickShortcut: function() {
        this.refs.shortcut.show();
    },

    clickInfo: function() {
        this.refs.info.show();
    },

    render: function() {
        var mainMenuItems = [
            { payload: '1', text: 'Hook Schema' },
            { payload: '2', text: 'Hook Entity Info' }
        ];

        var standardActions = [
            { text: 'OK', ref: 'ok' }
        ];

        return (
            <div>
                <Toolbar className='main-toolbar'>
                    <ToolbarGroup key={0} float='left'>
                        <DropDownMenu menuItems={mainMenuItems} onChange={this.handleMenuChange} />
                    </ToolbarGroup>
                    <ToolbarGroup key={1} float='right'>
                        <IconButton iconClassName='mdi mdi-help' tooltip='Shortcut' onClick={this.clickShortcut} />
                        <IconButton iconClassName='mdi mdi-information' tooltip='Info' onClick={this.clickInfo} />
                    </ToolbarGroup>
                </Toolbar>
                <Dialog
                    ref='shortcut'
                    title="Shortcut keys"
                    actions={standardActions}
                    modal={true}
                    openImmediately={false}>
                    <label>Ctrl + Alt + V</label>
                    <br/>
                    Add a new varchar field
                    <br/><br/>
                    <label>Ctrl + Alt + I</label>
                    <br/>
                    Add a new int field
                    <br/><br/>
                    <label>Ctrl + Alt + S</label>
                    <br/>
                    Add a new serial field
                    <br/><br/>
                    <label>Ctrl + Alt + D</label>
                    <br/>
                    Delete the last added field
                    <br/><br/>
                    <label>{'Ctrl + ? or Ctrl + /'}</label>
                    <br/>
                    Open this shortcut key dialog
                </Dialog>
                <Dialog
                    ref='info'
                    title='Drupal code generator'
                    actions={standardActions}
                    model={true}>
                    {'Made with ReactJS and Material UI '}<i className="mdi mdi-heart"></i>
                </Dialog>
            </div>
        );
    }
});

module.exports = Header;