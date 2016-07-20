import Ember from 'ember';

export default Ember.Component.extend({
  session:Ember.inject.service(),

  hostAppConfig: Ember.computed(function(){
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),

  url: Ember.computed('model',function(){
    let portalBaseUrl = 'https://www.arcgis.com';
    let itemId = this.get('model.id');
    let tn = this.get('model.thumbnail');
    //check for and use the url configured in the host app
    if(this.get('hostAppConfig.APP.portalBaseUrl')){
      portalBaseUrl = this.get('hostAppConfig.APP.portalBaseUrl');
    }

    let url = `${portalBaseUrl}/sharing/rest/content/items/${itemId}/info/${tn}`;
    if(this.get('model.access') !== 'public'){
      //tack on a token
      url = url + '?token=' + this.get('session.token');
    }
    return url;
  })

});
