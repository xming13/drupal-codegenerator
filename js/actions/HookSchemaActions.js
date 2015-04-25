var AppDispatcher = require('../dispatcher/AppDispatcher');
var HookSchemaConstants = require('../constants/HookSchemaConstants');

var HookSchemaActions = {

    /**
     * @param  {string} fieldName
     * @param  {string} fieldType
     */
    create: function(fieldName, fieldType) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.CREATE_FIELD,
            fieldName: fieldName,
            fieldType: fieldType
        });
    },

    /**
     * @param  {string} id The ID of the Field item
     * @param  {string} fieldName
     * @param  {string} fieldType
     */
    update: function(id, fieldName, fieldType) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_FIELD,
            id: id,
            fieldName: fieldName,
            fieldType: fieldType
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.DELETE_FIELD,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function() {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.DELETE_FIELD_COMPLETED
        });
    },

    updateTableName: function(tableName) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_TABLE_NAME,
            tableName: tableName
        });
    },

    updateSchema: function(schema) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_SCHEMA,
            schema: schema
        });
    }

};

module.exports = HookSchemaActions;
