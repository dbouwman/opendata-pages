import Ember from 'ember';

export default Ember.Route.extend({
  pagesService: Ember.inject.service('pages-service'),
  /**
   * Ensure user is authenticated
   */
  beforeModel(){
    //if not authenticated, bounce
    if(this.get('session.isAuthenticated') !== true){
      this.transitionTo('index');
    }
  },

  /**
   * create a new default empty page object as the model
   * then save it and transitionTo the edit route
   */
  model(){
    let currentUser = this.get('session.currentUser');
    let portal = this.get('session.portal');
    let props = {
      title:'New Page',
      public:false,
      uiVersion:2,
      owner: currentUser.username,
      ownerName: currentUser.fullName,
      updatedAt: new Date().toISOString(),
      affiliation: portal.name,
      sections:[
        {
          'containment': 'fixed',
          'isFooter': false,
          'style': {
            'background': {
              'color': 'transparent'
            },
            'color': '#000000'
          },
          'rows': []
        }
      ]
    };

    this.get('pagesService').create(props)
      .then((resp)=>{
        this.transitionTo('pages.page.edit', resp.id);
      })
      .catch((err)=>{
        console.error('Error saving page to AGO api: ' + JSON.stringify(err));
      });
  }
});
