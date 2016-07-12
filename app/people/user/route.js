import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Ensure user is authenticated
   */
  beforeModel(){
    //if not authenticated, bounce
    Ember.debug('Temporarily requiring auth to people.user.pages route...');
    if(this.get('session.isAuthenticated') !== true){
      Ember.debug('User is not authenticated... routing to index');
      this.transitionTo('index');
    }
  },
  /**
 * Return the model for this site
 * @param  {object} params Query String params
 * @return {Promise}        Promise for the model
 */
model(params){
  Ember.debug('Route /people/' + params.username + ' fired ' + JSON.stringify(params));
  //just return a simple object with the username from the route
  //this will be used in child routes vai modelFor
  return {username: params.username};
}
});
