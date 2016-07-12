import Ember from 'ember';

export default Ember.Controller.extend({
  username: Ember.computed('session', function(){
    if(this.get('session.isAuthenticated')){
      return this.get('session.currentUser.username');
    }else{
      return '';
    }
  })
});
