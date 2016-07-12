import Ember from 'ember';

export default Ember.Controller.extend({
  pagesService: Ember.inject.service('pages-service'),
  showConfirmDelete:false,
  modelToDelete:{},
  actions: {
    //show a dialog to confirm deletion of the page
    confirmDelete: function(page){
      this.toggleProperty('showConfirmDelete');
      this.set('modelToDelete', page);
      Ember.run.schedule('afterRender', () => {
        Ember.$('#confirmModal').modal();
      });
    },
    cancelDelete(){
      this.toggleProperty('showConfirmDelete');
    },
    stayOnPage(){
      //don't have to do anything but it's a hook we can use
    },
    onPageDelete(){
      let page = this.get('modelToDelete');
      this.toggleProperty('showConfirmDelete');
      this.get('pagesService').destroy(page)
      .then((resp)=>{
        Ember.debug('Delete succeeded');
        //TODO: Cause page list to refresh
        let username = this.get('session.currentUser.username');
        this.transitionToRoute('people.user.pages', {username:username});
      });



    }
  }
});
