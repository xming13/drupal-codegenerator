require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        backboneBootstrapModal: {
            deps: [
                'underscore',
                'jquery',
                'backbone'
            ],
            exports: 'backboneBootstrapModal'
        },
        bootstrap: {
            deps: ['backbone', 'backboneform'],
            exports: 'bootstrap'
        },
        list: {
            deps: ['backbone'],
            exports: 'list'
        }
    },
    paths: {
        jquery: 'libs/jquery/jquery.1.9.1.min',
        underscore: 'libs/underscore/underscore-min',
        bootstrap: 'libs/bootstrap/bootstrap',
        backbone: 'libs/backbone/backbone',
        backboneLocalstorage: 'libs/backbone/backbone.localStorage',
        backboneform: 'libs/backbone/backbone-forms.min',
        backboneBootstrapModal: 'libs/backbone/backbone.bootstrap-modal',
        list: 'libs/backbone/list.min',
        templates: '../templates'
    }
});

require(['app'], function(App) {
    console.log('App.initialize');
    App.initialize();
});