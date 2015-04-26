var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HookEntityInfoConstants = require('../constants/HookEntityInfoConstants');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _entityModel = {
    moduleName: '',
    baseTable: '',
    label: ''
};

function updateEntityModel(entityModel) {
    _.extend(_entityModel, entityModel);
}

var HookEntityInfoStore = assign({}, EventEmitter.prototype, {

    getEntityModel: function() {
        return _entityModel;
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
    switch (action.actionType) {
        case HookEntityInfoConstants.UPDATE_ENTITY_MODEL:
            updateEntityModel(action.entityModel);
            HookEntityInfoStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = HookEntityInfoStore;