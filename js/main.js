requirejs.config({
    paths: {
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
        "underscore": "../bower_components/underscore/underscore",
        "underscore.string": "../bower_components/underscore.string/dist/underscore.string",
        "backbone": "../bower_components/backbone/backbone",
        "localStorage": "../bower_components/backbone.localStorage/backbone.localStorage-min",
        "backbone-forms": "../bower_components/backbone-forms/distribution.amd/backbone-forms.min",
        "backbone-forms.list": "../bower_components/backbone-forms/distribution.amd/editors/list.min",
        "backbone-forms.bootstrap": "backbone-forms.bootstrap.custom",
        "backbone.bootstrap-modal": "backbone.bootstrap-modal.custom",
        "json2": "../bower_components/json2/json2",
        "highlight": "highlight.php"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        'underscore.string': {
            deps: ['underscore']
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
    'underscore',
    'backbone',
    'underscore.string',
    'backbone-forms',
    'backbone-forms.list',
    "backbone-forms.bootstrap",
    'backbone.bootstrap-modal',
    'bootstrap',
    'highlight'
], function ($, _, Backbone, s) {

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

                toString: function () {
                    return JSON.stringify(this);
                }
            });

            var index = Backbone.Model.extend({
                schema: {
                    name: { type: 'Text', validators: ['required'] },
                    'Column Names': { type: 'List', itemType: 'Text', validators: ['required'] }
                },
                toString: function () {
                    return JSON.stringify(this);
                }
            });

            var uniqueKey = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    'Column Names': { type: 'List', itemType: 'Text' }
                },
                toString: function () {
                    return JSON.stringify(this);
                }
            });

            var foreignKeyColumnMap = Backbone.Model.extend({
                schema: {
                    'Column name of referencing table': 'Text',
                    'Column name of referenced table': 'Text'
                },
                toString: function () {
                    return JSON.stringify(this);
                }
            });
            var foreignKeyDetail = Backbone.Model.extend({
                schema: {
                    table: 'Text',
                    columns: { type: 'List', itemType: 'NestedModel', model: foreignKeyColumnMap }
                },
                toString: function () {
                    return JSON.stringify(this);
                }
            });

            var foreignKey = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    'Detail': { type: 'List', itemType: 'NestedModel', model: foreignKeyDetail }
                },
                toString: function () {
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
                toString: function () {
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

            form.on('change', function (form, editor) {
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
            var renderViewMode =  _.template(
                "        '<%= view_mode_name %>' => array(\n" +
                "          'label' => t('<%= label %>'),\n" +
                "          'custom settings' => <%= custom_settings %>,\n" +
                "        ),");

            var viewMode = Backbone.Model.extend({
                schema: {
                    'view_mode_name': {
                        type: 'Text',
                        title: 'View Mode Name',
                        help: 'The name of the view mode.',
                        validators: ['required']
                    },
                    'label': {
                        type: 'Text',
                        title: 'Label',
                        help: 'The human-readable name of the view mode.',
                        validators: ['required']
                    },
                    'custom_settings': {
                        type: 'Radio',
                        title: 'Custom Settings',
                        options: ['TRUE', 'FALSE'],
                        help: 'A boolean specifying whether the view mode should by default use its own custom field display settings. ' +
                            'If FALSE, entities displayed in this view mode will reuse the \'default\' display settings by default (e.g. right after the module exposing the view mode is enabled), ' +
                            'but administrators can later use the Field UI to apply custom display settings specific to the view mode.'
                    }
                },
                defaults: {
                    'custom_settings': 'FALSE'
                },
                toCode: function() {
                    return renderViewMode(this.attributes);
                },
                toString: function() {
                    return '<pre><code>' + hljs.highlight('php5', this.toCode()).value + '</code></pre>';
                }
            })

            var entityInfo = Backbone.Model.extend({
                schema: {
                    'machine_name': {
                        type: 'Text',
                        title: 'Machine Name',
                        help: 'This will be used to auto generate some of the field values in this form.',
                        validators: [
                            {
                                type: 'regexp',
                                regexp: /^[a-z_\x7f-\xff][a-z0-9_\x7f-\xff]*$/,
                                message: 'The machine-readable name must contain only lowercase letters, numbers, and underscores. First character cannot be number.'
                            }
                        ]
                    },
                    'label': {
                        type: 'Text',
                        title: 'Label',
                        help: 'The human-readable name of the type.'
                    },
                    'controller_class': {
                        type: 'Text',
                        title: 'Controller Class',
                        help: 'The name of the class that is used to load the objects. The class has to implement the ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21entity.inc/interface/DrupalEntityControllerInterface/7" target="_blank">DrupalEntityControllerInterface</a> ' +
                            'interface. Leave blank to use the ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21entity.inc/interface/DrupalEntityControllerInterface/7" target="_blank">DrupalDefaultEntityController</a> ' +
                            'implementation.'
                    },
                    'base_table': {
                        type: 'Text',
                        title: 'Base Table',
                        help: '(used by ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21entity.inc/class/DrupalDefaultEntityController/7" target="_blank">DrupalDefaultEntityController</a>' +
                            ') The name of the entity type\'s base table.'
                    },
                    'revision_table': {
                        type: 'Text',
                        title: 'Revision Table',
                        help: 'The name of the entity type\'s revision table (if any).'
                    },
                    'static_cache': {
                        type: 'Radio',
                        title: 'Static Cache',
                        options: ['TRUE', 'FALSE'],
                        help: '(used by ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21entity.inc/class/DrupalDefaultEntityController/7" target="_blank">DrupalDefaultEntityController</a>' +
                            ') FALSE to disable static caching of entities during a page request. Defaults to TRUE.'
                    },
                    'field_cache': {
                        type: 'Radio',
                        title: 'Field Cache',
                        options: ['TRUE', 'FALSE'],
                        help: '(used by Field API loading and saving of field data) FALSE to disable Field API\'s persistent cache of field data. Only recommended if a higher level persistent cache is available for the entity type. Defaults to TRUE.'
                    },
                    'load_hook': {
                        type: 'Text',
                        title: 'Load Hook',
                        help: 'The name of the hook which should be invoked by DrupalDefaultEntityController:attachLoad(), for example \'node_load\'.'
                    },
                    'uri_callback': {
                        Type: 'Text',
                        title: 'URI Callback',
                        help: 'The name of an implementation of ' +
                            '<a href="https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/callback_entity_info_uri/7" target="_blank">callback_entity_info_uri()</a>.'
                    },
                    'label_callback': {
                        Type: 'Text',
                        title: 'Label Callback',
                        help: '(optional) The name of an implementation of ' +
                            '<a href="https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/callback_entity_info_label/7" target="_blank">callback_entity_info_label()</a>' +
                            ', which returns the label of the entity. The entity label is the main string associated with an entity; for example, the title of a node or the subject of a comment. ' +
                            'If there is an entity object property that defines the label, then using the \'label\' element of the \'entity keys\' return value component suffices to provide this information (see below). ' +
                            'Alternatively, specifying this callback allows more complex logic to determine the label of an entity. See also the ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21common.inc/function/entity_label/7" target="_blank">entity_label()</a>' +
                            ' function, which implements this logic.'
                    },
                    'language_callback': {
                        Type: 'Text',
                        title: 'Language Callback',
                        help: '(optional) The name of an implementation of ' +
                            '<a href="https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/callback_entity_info_language/7" target="_blank">callback_entity_info_language()</a>. ' +
                            'In most situations, when needing to determine this value, inspecting a property named after the \'language\' element of the \'entity keys\' should be enough. ' +
                            'The language callback is meant to be used primarily for temporary alterations of the property value: entity-defining modules are encouraged to always define a language property, ' +
                            'instead of using the callback as main entity language source. In fact not having a language property defined is likely to prevent an entity from being queried by language. Moreover, given that ' +
                            '<a href="https://api.drupal.org/api/drupal/includes%21common.inc/function/entity_language/7" target="_blank">entity_language()</a> ' +
                            'is not necessarily used everywhere it would be appropriate, modules implementing the language callback should be aware that this might not be always called.'
                    },
                    'fieldable': {
                        type: 'Radio',
                        options: ['TRUE', 'FALSE'],
                        help: 'Set to TRUE if you want your entity type to accept fields being attached to it.'
                    },
                    'translation': {
                        type: 'Text',
                        help: 'An associative array of modules registered as field translation handlers. Array keys are the module names, array values can be any data structure the module uses to provide field translation. Any empty value disallows the module to appear as a translation handler.'
                    },
                    'entity_keys': { type: 'Text', title: 'Entity Keys' },
                    'bundle_keys': { type: 'Text', title: 'Bundle Keys' },
                    'bundles': 'Text',
                    'view_modes': {
                        type: 'List',
                        title: 'View Modes',
                        itemType: 'NestedModel',
                        model: viewMode
                    }
                },
                defaults: {
                    'static_cache': 'FALSE',
                    'field_cache': 'TRUE',
                    'fieldable': 'TRUE'
                },
                codeTemplate: _.template("function hook_entity_info() {\n\
  $return = array(\n\
    '<%= machine_name %>' => array(\n\
      'label' => t('<%= label %>'),\n\
<% if (controller_class) { %>\
      'controller class' => '<%= controller_class %>',\n\
<% } %>\
      'base table' => '<%= base_table %>',\n\
      'revision table' => '<%= revision_table %>',\n\
      'static cache' => <%= static_cache %>,\n\
      'field cache' => <%= field_cache %>,\n\
      'load hook' => '<%= load_hook %>',\n\
      'uri callback' => '<%= uri_callback %>',\n\
<% if (label_callback) { %>\
      'label callback' => '<%= label_callback %>',\n\
<% } %>\
<% if (language_callback) { %>\
      'language callback' => '<%= language_callback %>',\n\
<% } %>\
      'fieldable' => <%= fieldable %>\n\
<% if (translation) { %>\
      'translation' => '<%= translation %>',\n\
<% } %>\
\
<% if (view_modes) { %>\
      'view modes' => array(\
<% _.each(view_modes, function(viewMode) { %>\
\n\
<%= renderViewMode(viewMode) %>\
<% }); %>\n\
       ),\n\
<% } %>\
    ),\n\
  );\n\
  \n\
  return $return;\n\
}\
"),
                toCode: function () {
                    this.attributes.renderViewMode = renderViewMode;
                    return this.codeTemplate(this.attributes);
                },
                toString: function() {
                    return hljs.highlight('php5', this.toCode()).value;
                }
            });

            var entityInfoModel = new entityInfo();

            var form = new Backbone.Form({
                model: entityInfoModel
            }).render();

            form.on('machine_name:change', function (form, machineNameEditor) {

                var machineName = machineNameEditor.getValue();

                form.setValue({
                    label: s.humanize(machineName),
                    controller_class: s.classify(machineName) + 'Controller',
                    base_table: machineName,
                    revision_table: machineName + '_revision',
                    load_hook: machineName + '_load'
                });
            });

            form.on('item:change', function(form, editor) {

            });

            form.on('change', function (form) {

                form.commit();

                $('#code-hook-entity-info pre code').html(entityInfoModel.toString());
            });

            $('#form-hook-entity-info').append(form.el);
        }
    });
});
