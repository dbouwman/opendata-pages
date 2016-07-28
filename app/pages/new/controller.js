import Ember from 'ember';

export default Ember.Controller.extend({
  pagesService: Ember.inject.service('pages-service'),

  msg:'',
  isWorking:false,
  

  actions: {
    selectTemplate(itemId){
      this.set('isWorking', true);
      console.log('Selected ' + itemId);
      this.set('msg', 'Fetching template...');
      this.get('pagesService').getPage(itemId)
      .then((page)=>{
        this.set('msg', 'Cloning template and saving item...');
        page.title = "Crime " + page.title;
        return this.get('pagesService').create(page);
      })
      .then((result)=>{
        this.set('msg', 'Loading editor...');
        let newId = result.id;
        this.transitionToRoute('pages.page.edit', newId);
      });

    }
  }
});
