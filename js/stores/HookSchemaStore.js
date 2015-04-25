/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HookSchemaConstants = require('../constants/HookSchemaConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};
var _schemaModel = {
    tableName: 'initial table name 2',
    tableDescription: 'initial table description 2',
    tableFields: {}
}

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
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
 * Update schemaModel.
 * @param  {object} schemaModel
 */
function updateSchema(schemaModel) {
    _schemaModel = schemaModel;
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
    var text;

    switch(action.actionType) {
        case HookSchemaConstants.CREATE_FIELD:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                HookSchemaStore.emitChange();
            }
            break;

        case HookSchemaConstants.UPDATE_FIELD:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
                HookSchemaStore.emitChange();
            }
            break;

        case HookSchemaConstants.DESTROY_FIELD:
            destroy(action.id);
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.DESTROY_FIELD_COMPLETED:
            destroyCompleted();
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_TABLE_NAME:
            updateTableName(action.tableName.trim());
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_TABLE_DESCRIPTION:
            updateTableDescription(action.tableDescription.trim());
            HookSchemaStore.emitChange();
            break;

        case HookSchemaConstants.UPDATE_SCHEMA:
            updateSchema(action.schema);
            HookSchemaStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = HookSchemaStore;
