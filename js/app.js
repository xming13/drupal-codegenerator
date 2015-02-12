define(['jquery', 'underscore', 'backbone', 'router'], function($, _, Backbone, Router) {

    var initialize = function() {
        console.log('router initialize');
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});