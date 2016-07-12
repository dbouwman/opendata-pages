import Ember from 'ember';

export default Ember.Controller.extend({
  eventBus: Ember.inject.service('eventBus'),
  cardService: Ember.inject.service('placeableCards'),
  pagesService: Ember.inject.service('pages-service'),
  placeableCards: Ember.computed(function(){
    return this.get('cardService').getPageCards();
  }),

  showPageEditor: Ember.computed.not('editorModel'),
  //we have three types of modals
  //one to confirm abandoning change while transitioning to View the page
  showConfirmViewPage:false,
  //one to confirm abandoning changes while trainsitioning to Page List
  showConfirmViewPagesList:false,
  //one to confirm deleting a page
  showConfimDelete: false,

  modelClone:'',//this is set in setupController on the route

  viewPage(){
    //need to get the full route from the router...
    let url = this.get('pageUrl');
    if(url){
      window.open(url);
    }else{
      console.error('Pages:page:edit:controller pageUrl was not set by the route.');
      alert('Error has occured. The page can not be viewed at this time.');
    }

  },

  viewPageList(){
    this.transitionToRoute('people.user.pages', {username: this.get('model.owner')});
  },

  actions: {

    onEditSettings(model, editorComponentName) {
      this.set('editorModel', model);
      this.set('editorComponentName', editorComponentName);
      this.get('eventBus').trigger('showDrawer');
    },

    onPageSave: function(){
      //update the things...
      this.set('model.ownerName', this.get('session.currentUser.fullName'));
      this.set('model.owner', this.get('session.currentUser.username'));
      this.set('model.affiliation', this.get('session.portal.name'));
      this.set('model.updatedAt', (new Date()).toISOString());


      this.get('pagesService').update(this.get('model'))
        .then((resp)=>{
          this.set('modelClone', JSON.stringify(this.get('model')));
          this.set('saved', true);
          return resp;
        })
        .catch((err)=>{
          Ember.debug('pages.page.edit.controller::onPageSave Error on Save to AGO: ' + err.message);
        });


    },

    //show a dialog to confirm deletion of the page
    confirmPageDelete: function(){
      this.toggleProperty('showConfirmDelete');
      Ember.run.schedule('afterRender', () => {
        Ember.$('#confirmModal').modal();
      });
    },

    //actuall delete the page
    onPageDelete: function(page){
      this.get('pageService').destroy(page)
        .then((resp)=>{
          this.transitionToRoute('people.user.pages', {username: this.get('model.owner')});
        });
    },


    //Go back!
    onGoBack: function(){

      let chk =JSON.stringify(this.get('model'));
      if(chk !== this.get('modelClone')){
        //we have *some* change somewhere in the model...
        this.toggleProperty('showConfirmViewPagesList');
        //but since the render has not occured yet...
        //we hook into afterRender to show it via the BS modal
        Ember.run.schedule('afterRender', () => {
          Ember.$('#confirmModal').modal();
            //we could use .on, but I suspect this will leak...
            // .on('hide.bs.modal', (e)=>{
            //     this.toggleProperty('showConfirmAbandonChanges');
            // });
        });

      }else{
        this.viewPageList();
      }
    },

    //Action called by our cancel buttons
    stayOnPage: function(){
      //we are not using toggle because we want
      //to keep things DRY and this function is
      //called from multiple modals
      this.set('showConfirmViewPage',false);
      this.set('showConfirmViewPagesList',false);
      this.set('showConfirmDelete',false);
    },
    //Action called by the
    continueToPagesList(){
      //rollback edits
      this.get('model').rollbackAttributes();
      //transition to the pagesList.
      //Pulled into a fn so we are DRY
      this.viewPageList();
    },

    onPageView: function(){
      let chk =JSON.stringify(this.get('model'));

      if(chk !== this.get('modelClone')){
        this.toggleProperty('showConfirmViewPage');

        Ember.run.schedule('afterRender', () => {
          Ember.$('#confirmModal').modal();
        });

      }else{
        this.viewPage();
      }
    },
    continueToViewPage(page){
      //rollback edits
      this.get('model').rollbackAttributes();
      //call the transition
      this.viewPage(page);
    },
    onLayoutDragStart(){
      console.log('pages:editor:controller got onLayoutDragStart');
      //hide the drawer...
      this.get('eventBus').trigger('hideDrawer');

    },
    onLayoutDragEnd(){
      console.log('pages:editor:controller got onLayoutDragEnd');
      //this.get('eventBus').trigger('hideDrawer');

    },
    onModelChanged: function(){
      Ember.debug('pages:page:edit:controller.onModelChanged - updating updated at timestamp...');
      this.set('model.updatedAt', (new Date()).toISOString());
      Ember.debug('Model.hasDirtyAttributes: ' + this.get('model.hasDirtyAttributes'));
    }

  }

});
