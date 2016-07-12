import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Get the model for the page
   */
  model(){
    //if the session is not authenticated, this will return null
    let currentUsername = this.get('session.currentUser.username');
    let page = this.modelFor('pages.page');

    if( (page && page.public) || ( page.owner === currentUsername ) ) {
      return page;
    }else{
      this.transitionTo('catchall', '404');
    }


  }
});
