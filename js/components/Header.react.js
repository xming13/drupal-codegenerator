var React = require('react');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;

var Header = React.createClass({

    render: function() {
        var mainMenuItems = [
            { payload: '1', text: 'Hook Schema' },
            { payload: '2', text: 'Hook Entity Info' }
        ];

        return (
            <Toolbar className='main-toolbar'>
                <ToolbarGroup float='left'>
                    <DropDownMenu menuItems={mainMenuItems} />
                </ToolbarGroup>
          </Toolbar>
        );
    }
});

module.exports = Header;