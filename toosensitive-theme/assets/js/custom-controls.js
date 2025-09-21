(function(api) {

    api.sectionConstructor['psychotherapy-upsell'] = api.Section.extend({
        attachEvents: function() {},
        isContextuallyActive: function() {
            return true;
        }
    });

})(wp.customize);