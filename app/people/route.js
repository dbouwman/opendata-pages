import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(transition) {
    // redirect user to index if they are not asking for an approved route
    Ember.debug('Router for /people called with transition to ' + transition.targetName);
    if ( ['my-data','people.user.pages'].indexOf(transition.targetName) === -1 ) {
      Ember.debug('Invalid route requested... transitioning to index');
        this.transitionTo('index');
    }
  },

});
