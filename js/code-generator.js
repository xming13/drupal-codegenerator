$(document).ready(function () {

    Backbone.Form.editors.List.Modal.ModalAdapter = Backbone.BootstrapModal;

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

    var dbSchemas = new dbSchemas();

    var form = new Backbone.Form({
        model: dbSchemas
    }).render();

    form.on('change', function(form, editor) {
        form.commit();
        $('#hook-schema pre').html(
            syntaxHighlight(
                JSON.stringify(dbSchemas.toJSON(), null, 4)
            )
        );
    });

    $('#form').append(form.el);

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
