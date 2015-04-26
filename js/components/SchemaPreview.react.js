var React = require('react');
var SchemaPreviewField = require('./SchemaPreviewField.react');
var _ = require('underscore');

var SchemaPreview = React.createClass({
    render: function() {
        var schemaPreviewFields = this.props.schemaModel.tableFields.map(function(tableField, index) {
            return (<SchemaPreviewField tableField={tableField} key={index}/>);
        });

        var indexes = _.map(this.props.schemaModel.tableFields, function(tableField) {
            return "      '" + tableField.fieldName + "' => array('" + tableField.fieldName + "'),\n"
        }).join('');

        var primaryKeys = _.map(_.where(this.props.schemaModel.tableFields, {type: 'serial'}), function(tableField) {
            return "'" + tableField.fieldName + "'";
        }).join(', ');

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
                        {'    \'indexes\' => array(\n'}
                        {indexes}
                        {'    ),\n'}
                        {'    \'primary key\' => array('}{primaryKeys}{'),\n'}
                        {'  );\n'}
                        }
                    </code>
                </pre>
            </div>
        );
    }
});

module.exports = SchemaPreview;