var React = require('react');
var ReactZeroClipboard = require('react-zeroclipboard');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var Snackbar = mui.Snackbar;

var EntityInfoPreview = React.createClass({
    getCopiedText: function() {

    },

    clickCopy: function() {

    },

    render: function() {
        return (
            <div className='hook-entity-info-code'>
                <pre>
                    <ReactZeroClipboard getText={this.getCopiedText}>
                        <IconButton className='copy' iconClassName='mdi mdi-content-copy' tooltip="Copy" onClick={this.clickCopy}/>
                    </ReactZeroClipboard>
                    <code className='php' ref='code'>
                        {'function hook_entity_info() {\n'}
                        {'  $info = array(\n'}
                        {'    \'label\' => t(\''}{this.props.entityModel.label}{'\'),\n'}
                        {'    \'base table\' => \''}{this.props.entityModel.baseTable}{'\',\n'}
                        {'    \'module\' => \''}{this.props.entityModel.moduleName}{'\',\n'}
                        {'  );\n'}
                        {'\n'}
                        {'  return $info;\n'}
                        }
                    </code>
                </pre>
                <Snackbar
                ref='snackbar'
                className='copied'
                message='Copied!'/>
            </div>
        );
    }
});

module.exports = EntityInfoPreview;