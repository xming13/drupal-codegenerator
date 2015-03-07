requirejs.config({
    paths: {
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
        "underscore": "../bower_components/underscore/underscore",
        "underscore.string": "../bower_components/underscore.string/dist/underscore.string.min",
        "backbone": "../bower_components/backbone/backbone",
        "localStorage": "../bower_components/backbone.localStorage/backbone.localStorage-min",
        "backbone-forms": "../bower_components/backbone-forms/distribution.amd/backbone-forms.min",
        "backbone-forms.list": "../bower_components/backbone-forms/distribution.amd/editors/list.min",
        "backbone-forms.bootstrap": "backbone-forms.bootstrap.custom",
        "backbone.bootstrap-modal": "backbone.bootstrap-modal.custom",
        "json2": "../bower_components/json2/json2"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"/*, "json2"*/],
            exports: "Backbone"
        },
        "backbone.bootstrap-modal": ["jquery", "underscore", "backbone"],
        "backbone-forms.bootstrap": ["backbone"],
        localStorage: ["backbone"]
    },

    deps: ['jquery', 'underscore', 'backbone']
});

require([
    'jquery',
    'backbone',
    'backbone-forms',
    'backbone-forms.list',
    "backbone-forms.bootstrap",
    'backbone.bootstrap-modal',
    'bootstrap'
], function($, Backbone) {

    $(function () {
        Backbone.Form.editors.List.Modal.ModalAdapter = Backbone.BootstrapModal;

        initFormHookSchema();
        initFormHookEntityInfo();

        function initFormHookSchema() {
            var field = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    description: 'Text',
                    type: {type: 'Select', options: ['serial', 'int', 'varchar']},
                    unsigned: {
                        type: 'Radio',
                        options: {
                            value1: 'TRUE',
                            value2: 'FALSE'
                        }
                    },
                    'not null': {
                        type: 'Radio',
                        options: {
                            value1: 'TRUE',
                            value2: 'FALSE'
                        }
                    },
                    default: 'Text'
                },

                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var index = Backbone.Model.extend({
                schema: {
                    name: { type: 'Text', validators: ['required'] },
                    'Column Names': { type: 'List', itemType: 'Text', validators: ['required'] }
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var uniqueKey = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    'Column Names': { type: 'List', itemType: 'Text' }
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var foreignKeyColumnMap = Backbone.Model.extend({
                schema: {
                    'Column name of referencing table': 'Text',
                    'Column name of referenced table': 'Text'
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });
            var foreignKeyDetail = Backbone.Model.extend({
                schema: {
                    table: 'Text',
                    columns: { type: 'List', itemType: 'NestedModel', model: foreignKeyColumnMap }
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var foreignKey = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    'Detail': { type: 'List', itemType: 'NestedModel', model: foreignKeyDetail }
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var dbSchema = Backbone.Model.extend({
                schema: {
                    'Table Name': 'Text',
                    description: 'Text',
                    fields: { type: 'List', itemType: 'NestedModel', model: field },
                    indexes: { type: 'List', itemType: 'NestedModel', model: index },
                    'Unique Keys': { type: 'List', itemType: 'NestedModel', model: uniqueKey },
                    'Foreign Keys': { type: 'List', itemType: 'NestedModel', model: foreignKey },
                    'Primary Key': { type: 'List', itemType: 'Text' }
                },
                toString: function() {
                    return JSON.stringify(this);
                }
            });

            var dbSchemas = Backbone.Model.extend({
                schema: {
                    schemas: { type: 'List', itemType: 'NestedModel', model: dbSchema }
                }
            });

            var dbSchemaModel = new dbSchemas();

            var form = new Backbone.Form({
                model: dbSchemaModel
            }).render();

            form.on('change', function(form, editor) {
                form.commit();
                $('#code-hook-schema pre').html(
                    syntaxHighlight(
                        JSON.stringify(dbSchemaModel.toJSON(), null, 4)
                    )
                );
            });

            $('#form-hook-schema').append(form.el);
        }

        function initFormHookEntityInfo() {
            var entityInfo = Backbone.Model.extend({
                schema: {
                    'machine_name': { type: 'Text', title: 'Machine Name', help: 'This will be used to auto generate some of the field values in this form.' },
                    'label': { type: 'Text', title: 'Label', help: 'Provides a human-readable label.'},
                    'controller_class': { type: 'Text', title: 'Controller Class' },
                    'base_table': { type: 'Text', title: 'Base Table' },
                    'revision_table': { type: 'Text', title: 'Revision Table' },
                    'static_cache': {
                        type: 'Radio',
                        title: 'Static Cache',
                        options: ['TRUE', 'FALSE']
                    },
                    'field_cache': {
                        type: 'Radio',
                        title: 'Field Cache',
                        options: ['TRUE', 'FALSE']
                    },
                    'load_hook': { type: 'Text', title: 'Load Hook' },
                    'uri_callback': { Type: 'Text', title: 'URI Callback' },
                    'label_callback': { Type: 'Text', title: 'Label Callback' },
                    'language_callback': { Type: 'Text', title: 'Language Callback' },
                    'fieldable': {
                        type: 'Radio',
                        options: ['TRUE', 'FALSE']
                    },
                    'translation': 'Text',
                    'entity_keys': { type: 'Text', title: 'Entity Keys' },
                    'bundle_keys': { type: 'Text', title: 'Bundle Keys' },
                    'bundles': 'Text',
                    'view_modes': { type: 'Text', title: 'View Modes' }
                },
                defaults: {
                    'static_cache': 'FALSE',
                    'field_cache': 'TRUE'
                },
                toString: function() {
                    var jsonString = JSON.stringify(this.toJSON(), null, 4);
                    return jsonString.replace("{", "array(").replace('}', ')');
                }
            });

            var entityInfoModel = new entityInfo();

            var form = new Backbone.Form({
                model: entityInfoModel
            }).render();

            form.on('change', function(form, editor) {
                form.commit();
                $('#code-hook-entity-info pre').html(
                    syntaxHighlight(entityInfoModel.toString())
                );
            });

            $('#form-hook-entity-info').append(form.el);
        }

        function syntaxHighlight(json) {
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    });
});
