import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['edit'],
  edit: null,
  onEditChange:Ember.observer('model', function(){
    if(this.get('edit')){
      //redirect to the edit Route
      Ember.debug('Redirecting to the /edit route...');
      this.set('edit', null);
      this.transitionToRoute('pages.page.edit', this.get('model'));
    }
  })
});
