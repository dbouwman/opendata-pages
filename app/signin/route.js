import Ember from 'ember';

export default Ember.Route.extend({


  deactivate: function(){
    //if you are using iframes, you will need to remove the
    //iframe from the DOM here so torii gets notified that the
    //auth attempt was cancelled.
    Ember.debug('route:signin:deactivate fired...');
  },

  actions: {
    signin: function(){
      this.get('session').open('arcgis-oauth-bearer')
        .then((authorization) => {
          Ember.debug('AUTH SUCCESS: ', authorization);
          //transition to some secured route or... so whatever is needed
          let username = this.get('session.currentUser.username');
          this.controller.transitionToRoute('people.user.pages', {username: username});
        })
        .catch((err)=>{
          Ember.debug('AUTH ERROR: ', err);
        });
    }
  }
});
