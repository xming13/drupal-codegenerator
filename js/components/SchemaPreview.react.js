var React = require('react');
var SchemaPreviewField = require('./SchemaPreviewField.react');

var SchemaPreview = React.createClass({
    render: function() {
        var schemaPreviewFields = this.props.schemaModel.tableFields.map(function(tableField, index) {
            return (<SchemaPreviewField tableField={tableField} key={index}/>);
        });
        return (
            <div className='hook-schema-code'>
                <pre>
                    <code className='php'>
                        {'function hook_schema() {\n'}
                        {'  $schema[\''}{this.props.schemaModel.tableName}{'\'] = array(\n'}
                        {'    \'description\' => \''}{this.props.schemaModel.tableDescription}{'\',\n'}
                        {'    \'fields\' => array(\n'}
                        {schemaPreviewFields}
                        {'    ),\n'}
                        {'  ),\n'}
                        }
                    </code>
                </pre>
            </div>
        );
    }
});

module.exports = SchemaPreview;