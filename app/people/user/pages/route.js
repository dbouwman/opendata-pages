import Ember from 'ember';

export default Ember.Route.extend({
  pagesService: Ember.inject.service('pages-service'),
    /**
   * Return the list of pages for the specified user
   * @param  {object} params Query String params
   * @return {Promise}        Promise for the model
   */
  model(){
    let username = this.modelFor('people.user').username;

    return Ember.RSVP.hash({
      pages: this.get('pagesService').getUserPages(username).then((json)=>{
        return json.results;
      }),
      user: this.modelFor('people.user')
    });

  }
});
