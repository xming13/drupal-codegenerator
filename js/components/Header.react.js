var React = require('react');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var IconButton = mui.IconButton;
var Dialog = mui.Dialog;

var Header = React.createClass({
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
                        <DropDownMenu menuItems={mainMenuItems} />
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
                    Ctrl + Alt + V: Add a new varchar field
                    <br/><br/>
                    Ctrl + Alt + I: Add a new int field
                    <br/><br/>
                    Ctrl + Alt + S: Add a new serial field
                    <br/><br/>
                    Ctrl + Alt + D: Delete the last added field
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