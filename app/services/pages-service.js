import Ember from 'ember';


export default Ember.Service.extend({
  itemsService: Ember.inject.service('items-service'),
  /**
   * Return all pages belonging to a user
   */
  getUserPages(username, num=100, start=1){
    let form = {
      q:'owner:' + username + ' AND tags:odpage AND type:Web Mapping Application',
      sortField:'title',
      num:num,
      start:start
    };
    return this.get('itemsService').search(form);
  },

  /**
   * Return the /data
   */
  getPage(id){
    return this.get('itemsService').getDataById(id)
    .then((data)=>{
      //we use the `.values` part of the app config hash
      data.values.id = id;
      return data.values;
    });
  },

  create(page){
    let data = {
      "source": "OPENDATAPAGESBUWHAHAHAH",
      "folderId": null,
      "values": page
    };
    let item = {
      'title':page.title,
      'owner':page.owner,
      'type':'Web Mapping Application',
      'typeKeywords': [
        'JavaScript',
        'Map',
        'Mapping Site',
        'Online Map',
        'Ready To Use',
        'selfConfigured',
        'Web Map'
      ],
      'tags':['odpage'],
      'text': JSON.stringify(data).replace('&', ' ')
    };

    return this.get('itemsService').create(item);
  },

  update(page){
    let data = {
      "source": "OPENDATAPAGESBUWHAHAHAH",
      "folderId": null,
      "values": page
    };
    let item = {
      'id':page.id,
      'title':page.title,
      'description':page.description,
      'owner':page.owner,
      'text': JSON.stringify(data).replace(/&/g, ' ')

    };
    return this.get('itemsService').update(item);
  },

  destroy(page){
    return this.get('itemsService').destroy(page.id, page.owner);
  },

  encodePageAsForm(form = {}){
    Ember.merge(form, this.get('defaultParams'));
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=');
    }).join('&');
  },

});
