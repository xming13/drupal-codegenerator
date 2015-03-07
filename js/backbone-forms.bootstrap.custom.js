/**
 * Include this template file after backbone-forms.amd.js to override the default templates
 *
 * 'data-*' attributes control where elements are placed
 */
;(function(Form) {


    /**
     * Bootstrap 3 templates
     */
    Form.template = _.template('\
    <form class="form-horizontal" role="form" data-fieldsets></form>\
  ');


    Form.Fieldset.template = _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend><%= legend %></legend>\
      <% } %>\
    </fieldset>\
  ');


    Form.Field.template = _.template('\
    <div class="form-group field-<%= key %>">\
      <label class="col-sm-4 control-label" for="<%= editorId %>"><%= title %></label>\
      <div class="col-sm-8">\
        <span data-editor></span>\
        <p class="help-block" data-error></p>\
        <p class="help-block"><%= help %></p>\
      </div>\
    </div>\
  ');


    Form.NestedField.template = _.template('\
    <div class="field-<%= key %>">\
      <div title="<%= title %>" class="input-xlarge">\
        <span data-editor></span>\
        <div class="help-inline" data-error></div>\
      </div>\
      <div class="help-block"><%= help %></div>\
    </div>\
  ');

    Form.editors.Base.prototype.className = '';
    Form.Field.errorClassName = 'has-error';


    if (Form.editors.List) {

        Form.editors.List.template = _.template('\
      <div class="bbf-list">\
        <ul class="list-group clearfix" data-items></ul>\
        <button type="button" class="btn btn-primary btn-sm bbf-add" data-action="add">Add</button>\
      </div>\
    ');


        Form.editors.List.Item.template = _.template('\
      <li class="list-group-item clearfix">\
        <div class="pull-left bbf-list-item" data-editor></div>\
        <button type="button" class="close bbf-del" data-action="remove" aria-label="Close">\
            <span aria-hidden="true">&times;</span>\
        </button>\
      </li>\
    ');

        Form.editors.List.Object.template = Form.editors.List.NestedModel.template = _.template('\
      <%= summary %>\
    ');

    }

    /**
     * Text
     *
     * Text input with focus, blur and change events
     */
    Form.editors.Text = Form.Editor.extend({

        tagName: 'input',

        className: 'form-control',

        defaultValue: '',

        previousValue: '',

        events: {
            'keyup':    'determineChange',
            'keypress': function(event) {
                var self = this;
                setTimeout(function() {
                    self.determineChange();
                }, 0);
            },
            'select':   function(event) {
                this.trigger('select', this);
            },
            'focus':    function(event) {
                this.trigger('focus', this);
            },
            'blur':     function(event) {
                this.trigger('blur', this);
            }
        },

        initialize: function(options) {
            Form.editors.Base.prototype.initialize.call(this, options);

            var schema = this.schema;

            //Allow customising text type (email, phone etc.) for HTML5 browsers
            var type = 'text';

            if (schema && schema.editorAttrs && schema.editorAttrs.type) type = schema.editorAttrs.type;
            if (schema && schema.dataType) type = schema.dataType;

            this.$el.attr('type', type);
        },

        /**
         * Adds the editor to the DOM
         */
        render: function() {
            this.setValue(this.value);

            return this;
        },

        determineChange: function(event) {
            var currentValue = this.$el.val();
            var changed = (currentValue !== this.previousValue);

            if (changed) {
                this.previousValue = currentValue;

                this.trigger('change', this);
            }
        },

        /**
         * Returns the current editor value
         * @return {String}
         */
        getValue: function() {
            return this.$el.val();
        },

        /**
         * Sets the value of the form element
         * @param {String}
         */
        setValue: function(value) {
            this.$el.val(value);
        },

        focus: function() {
            if (this.hasFocus) return;

            this.$el.focus();
        },

        blur: function() {
            if (!this.hasFocus) return;

            this.$el.blur();
        },

        select: function() {
            this.$el.select();
        }

    });

    /**
     * Radio
     */
    Form.editors.Radio = Form.editors.Select.extend({

        tagName: 'div',

        events: {
            'change input[type=radio]': function() {
                this.trigger('change', this);
            },
            'focus input[type=radio]': function() {
                if (this.hasFocus) return;
                this.trigger('focus', this);
            },
            'blur input[type=radio]': function() {
                if (!this.hasFocus) return;
                var self = this;
                setTimeout(function() {
                    if (self.$('input[type=radio]:focus')[0]) return;
                    self.trigger('blur', self);
                }, 0);
            }
        },

        getValue: function() {
            return this.$('input[type=radio]:checked').val();
        },

        setValue: function(value) {
            this.$('input[type=radio]').val([value]);
        },

        focus: function() {
            if (this.hasFocus) return;

            var checked = this.$('input[type=radio]:checked');
            if (checked[0]) {
                checked.focus();
                return;
            }

            this.$('input[type=radio]').first().focus();
        },

        blur: function() {
            if (!this.hasFocus) return;

            this.$('input[type=radio]:focus').blur();
        },

        /**
         * Create the radio list HTML
         * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
         *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
         * @return {String} HTML
         */
        _arrayToHtml: function (array) {
            var html = [];
            var self = this;

            _.each(array, function(option, index) {
                var itemHtml = '<div class="radio">';
                if (_.isObject(option)) {
                    var val = (option.val || option.val === 0) ? option.val : '';
                    itemHtml += ('<label for="'+self.id+'-'+index+'">');
                    itemHtml += ('<input type="radio" name="'+self.getName()+'" value="'+val+'" id="'+self.id+'-'+index+'" />');
                    itemHtml += option.label+'</label>';
                }
                else {
                    itemHtml += ('<label for="'+self.id+'-'+index+'">');
                    itemHtml += ('<input type="radio" name="'+self.getName()+'" value="'+option+'" id="'+self.id+'-'+index+'" />');
                    itemHtml += option+'</label>';
                }
                itemHtml += '</div>';
                html.push(itemHtml);
            });

            return html.join('');
        }

    });

})(Backbone.Form);
