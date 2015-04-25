var React = require('react');

var SchemaPreview = React.createClass({
    render: function() {
        return (
            <div className="fixed-wrapper col-sm-5">
                <div id="code-hook-entity-info" className='preview'>
                    <pre>
                        <code className='php'>
                            {'function hook_schema() {\n'}
                            {'    $schema[\''}{this.props.schemaModel.tableName}{'\'] = array(\n'}
                            {'      \'description\' => \''}{this.props.schemaModel.tableDescription}{'\',\n'}
                            {'    ),\n'}
                            }
                        </code>
                    </pre>
                </div>
            </div>
        );
    }
});

module.exports = SchemaPreview;