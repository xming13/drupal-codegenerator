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
            var infoArr = [];
            _.each(this.attributes, function(val, key) {
                infoArr.push(key + ': ' + val);
            });

            return '{' + infoArr.join(',\r\n') + '}';
        }
    });

    var foreignKey = Backbone.Model.extend({
        schema: {
            name: 
        }
    });

    var Schema = Backbone.Model.extend({
        schema: {
            'Table Name': 'Text',
            'Description': 'Text',
            'Fields': { type: 'List', itemType: 'NestedModel', model: field },
            'Foreign Keys': { type: 'List', itemType: 'NestedModel', model: foreignKey },
            'Primary Key': { type: 'List', itemType: 'Text' }
        }
    });

    var schema = new Schema();

    var form = new Backbone.Form({
        model: schema
    }).render();

    $('body').append(form.el);

});
