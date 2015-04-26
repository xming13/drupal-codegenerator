var React = require('react');
var ReactZeroClipboard = require('react-zeroclipboard');
var hljs = require('highlight.js');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var Snackbar = mui.Snackbar;

var EntityInfoPreview = React.createClass({
    componentDidMount: function() {
        var codeBlock = this.refs.code.getDOMNode();
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    componentDidUpdate: function() {
        var codeBlock = this.refs.code.getDOMNode();
        if (codeBlock) {
            hljs.highlightBlock(codeBlock);
        }
    },

    getCopiedText: function() {
        var code = this.refs.code.getDOMNode();
        return code ? code.textContent : '';
    },

    clickCopy: function() {
        this.refs.snackbar.show();
    },

    render: function() {
        var entityModel = this.props.entityModel;
        var labelCallback = entityModel.baseTable + '_label';
        var controllerClass = entityModel.baseTable + 'APIController';

        return (
            <div className='hook-entity-info-code'>
                <pre>
                    <ReactZeroClipboard getText={this.getCopiedText}>
                        <IconButton className='copy' iconClassName='mdi mdi-content-copy' tooltip="Copy" onClick={this.clickCopy}/>
                    </ReactZeroClipboard>
                    <code className='php' ref='code'>
                        {'function '}{entityModel.moduleName}{'_entity_info() {\n'}
                        {'  $info = array(\n'}
                        {'    \''}{entityModel.baseTable}{'\' => array(\n'}
                        {'      \'base table\' => \''}{entityModel.baseTable}{'\',\n'}
                        {'      \'label\' => t(\''}{entityModel.label}{'\'),\n'}
                        {'      \'label callback\' => \''}{labelCallback}{'\',\n'}
                        {'      \'controller class\' => \''}{controllerClass}{'\',\n'}
                        {'      \'module\' => \''}{entityModel.moduleName}{'\',\n'}
                        {'    ),\n'}
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