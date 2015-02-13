define([
    'jquery',
    'underscore',
    'bootstrap',
    'backbone',
    'backboneform',
    'list',
], function($, _, bootstrap, Backbone, Backboneform, list) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'list',
        },

        list: function() {

            console.log('$', $);
            console.log('_', _);
            console.log('bootstrap', bootstrap);
            console.log('Backbone', Backbone);
            console.log('Backboneform', Backboneform);
            console.log('List', list);

            Backboneform.editors.List.Modal.ModalAdapter = Backbone.BootstrapModal;

            var field = Backbone.Model.extend({
                schema: {
                    name: 'Text',
                    description: 'Text',
                    type: { type: 'Select', options: ['serial', 'int', 'varchar']},
                    unsigned: {
                        type: 'Radio',
                        options: {
                            value1: 'TRUE',
                            value2: 'FALSE'
                        }
                    }
                }
            });

            var Schema = Backbone.Model.extend({
                schema: {
                    'Table Name': 'Text',
                    'Description': 'Text',
                    'fields': { type: 'List', itemType: 'NestedModel', model: field }
                }
            });

            var schema = new Schema();

            var form = new Backboneform({
                model: schema
            }).render();

            $('body').append(form.el);
        }
    });

    var initialize = function() {

        var appRouter = new AppRouter();

        Backbone.history.start();

    };

    return {
        initialize: initialize
    };
});
