import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(transition) {
    // NOTE: until we have a pages page for the site, we redirect to index
    if (transition.targetName !== 'my-data') {
        this.transitionTo('index');
    }
  },

});
