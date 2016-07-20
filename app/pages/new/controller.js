import Ember from 'ember';

export default Ember.Controller.extend({
  pagesService: Ember.inject.service('pages-service'),


  actions: {
    selectTemplate(itemId){
      console.log('Selected ' + itemId);
      this.get('pagesService').getPage(itemId)
      .then((page)=>{
        page.title = "Page Started from " + page.title + " Template"
        return this.get('pagesService').create(page);
      })
      .then((result)=>{
        let newId = result.id;
        this.transitionToRoute('pages.page.edit', newId);
      });

    }
  }
});
