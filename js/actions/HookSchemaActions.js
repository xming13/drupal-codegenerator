var AppDispatcher = require('../dispatcher/AppDispatcher');
var HookSchemaConstants = require('../constants/HookSchemaConstants');

var HookSchemaActions = {

    /**
     * @param  {string} fieldType
     */
    create: function(fieldType) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.CREATE_FIELD,
            fieldType: fieldType
        });
    },

    /**
     * @param  {int} id
     * @param  {object} tableFieldItem
     */
    update: function(id, tableFieldItem) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_FIELD,
            id: id,
            tableFieldItem: tableFieldItem
        });
    },

    /**
     * @param  {int} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.DESTROY_FIELD,
            id: id
        });
    },

    /**
     *  {object} @param tableFields
     */
    updateTableFields: function(tableFields) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_TABLE_FIELDS,
            tableFields: tableFields
        });
    },

    /**
     * @param  {object} schema
     */
    updateSchema: function(schema) {
        AppDispatcher.dispatch({
            actionType: HookSchemaConstants.UPDATE_SCHEMA,
            schema: schema
        });
    }

};

module.exports = HookSchemaActions;
