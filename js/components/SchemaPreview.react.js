var React = require('react');

var SchemaPreview = React.createClass({
    render: function() {
        return (
            <div className='preview'>
                {this.props.schemaModel.tableName}
                <br/>
                {this.props.schemaModel.tableDescription}
            </div>
        );
    }
});

module.exports = SchemaPreview;