import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Get the model from the pages.page route
   */
  model(/*params*/){

    let model = this.modelFor('pages.page');
    //if the user is not authenticated, then bounce them to
    //the read-only view of the page
    if(this.get('session.isAuthenticated') !== true){
      this.transitionTo('pages.page', model);
    }
    return model;
  },

  setupController(controller, model /*, transition*/) {
    this._super(...arguments); // Do not forget this call
    let pageUrl = window.location.origin + this.router.generate('pages.page.index', model);
    controller.setProperties({
      pageUrl: pageUrl,
      modelClone: JSON.stringify(model)
    });
  }

});
