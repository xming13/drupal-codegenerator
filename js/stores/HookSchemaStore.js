var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _schemaModel = {
    moduleName: '',
    tableName: '',
    tableDescription: '',
    tableFields: []
};

/**
 * Create a tableField item.
 * @param  {string} fieldName The field name of the tableField item
 * @param  {string} fieldType The field type of the tableField item
 */
function create(fieldType) {
    var fieldItem = {};
    switch (fieldType) {
        case HookSchemaConstants.FIELD_TYPE_VARCHAR:
            fieldItem = {
                'fieldName': '',
                'description': '',
                'type': 'varchar',
                'length': 255,
                'not null': true,
                'default': ''
            };
            break;

        case HookSchemaConstants.FIELD_TYPE_INT:
            fieldItem = {
                'fieldName': '',
                'description': '',
                'type': 'int',
                'unsigned': true,
                'not null': true,
                'default': 0
            };
            break;

        case HookSchemaConstants.FIELD_TYPE_SERIAL:
            fieldItem = {
                'fieldName': '',
                'description': '',
                'type': 'serial',
                'unsigned': true,
                'not null': true
            };
            break;

        default:
            console.log('Error - unknown field type');
            return false;
    }

    fieldItem.id = _.isEmpty(_schemaModel.tableFields) ? 0 : _.max(_.pluck(_schemaModel.tableFields, 'id')) + 1;
    fieldItem.focusInput = true;
    _.each(_schemaModel.tableFields, function(tableField) {
        tableField.focusInput = false;
    });
    _schemaModel.tableFields.push(fieldItem);
    return fieldItem.id;
}

/**
 * Update a tableField item.
 * @param  {string} fieldName
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    var tableFieldItem = _.findWhere(_schemaModel.tableFields, {id: id});
    if (tableFieldItem) {
        _.extend(tableFieldItem, updates);
    }
    else {
        console.log('update failed, fieldItem with id: ' + id + ' does not exist.');
    }
}

/**
 * Delete a tableField item.
 * @param  {int} id
 */
function destroy(id) {
    _schemaModel.tableFields = _.without(_schemaModel.tableFields, _.findWhere(_schemaModel.tableFields, {id: id}));
}

/**
 * Update table name.
 * @param  {string} tableName
 */
function updateTableName(tableName) {
    _schemaModel.tableName = tableName;
}

/**
 * Update table description.
 * @param  {string} tableDescription
 */
function updateTableDescription(tableDescription) {
    _schemaModel.tableDescription = tableDescription;
}

/**
 * Update table fields.
 * @param  {string} tableFields
 */
function updateTableFields(tableFields) {
    _schemaModel.tableFields = tableFields;
}

/**
 * Update schemaModel.
 * @param  {object} schemaModel
 */
function updateSchema(schemaModel) {
    _.extend(_schemaModel, schemaModel);
}

var HookSchemaStore = assign({}, EventEmitter.prototype, {

    getSchemaModel: function() {
        return _schemaModel;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case HookSchemaConstants.CREATE_FIELD:
            create(action.fieldType);
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_FIELD:
            update(action.id, action.tableFieldItem);
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.DESTROY_FIELD:
            destroy(action.id);
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_TABLE_FIELDS:
            updateTableFields(action.tableFields);
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_SCHEMA:
            updateSchema(action.schema);
            HookSchemaStore.emitChange();
            break;

        default:
            break;
    }
});

module.exports = HookSchemaStore;
