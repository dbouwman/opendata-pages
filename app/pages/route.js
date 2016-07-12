import Ember from 'ember';

export default Ember.Route.extend({
  //TEMP: During development we lock down access to /pages/*
  //to authed users in a subset of orgs
  beforeModel(){
    let session = this.get('session');
    let orgsWithPages = ['LjjARY1mkhxulWPq','97KLIFOSt5CxbiRI', 'bkrWlSKcjUDFDtgw', 'VjKJdBIEYrE5kSOl'];
    if(session.get('isAuthenticated') === false || session.isInAnyOrg(orgsWithPages) ===false){
      //redirect to index
      Ember.debug('Pages access currently restricted. Returning to homepage...');
      this.transitionTo('index');
    }
  }
});
