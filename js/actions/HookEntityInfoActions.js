var AppDispatcher = require('../dispatcher/AppDispatcher');
var HookEntityInfoConstants = require('../constants/HookEntityInfoConstants');

var HookEntityInfoActions = {

    /**
     * @param  {object} entityModel
     */
    updateEntityModel: function(entityModel) {
        AppDispatcher.dispatch({
            actionType: HookEntityInfoConstants.UPDATE_ENTITY_MODEL,
            entityModel: entityModel
        });
    }
};

module.exports = HookEntityInfoActions;