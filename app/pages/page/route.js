import Ember from 'ember';
export default Ember.Route.extend({
  pagesService: Ember.inject.service('pages-service'),
  /**
   * Get the model for the page
   */
  model(params){
    return this.get('pagesService').getPage(params.id);
  }
});
