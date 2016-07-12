/**
 * placeable-cards.js
 */
 import Ember from 'ember';
 import getDefaultSection from 'opendata-pages/utils/get-default-section';
 export default Ember.Service.extend({
   getPageCards(){
     return [
         {
           "name": "new-section",
           "i18n": "layout.components.section.name",
           "icon": "row.svg",
           "dragType": "section",
           "defaults": getDefaultSection()
         },
         {
           "name": "image-card",
           "i18n": "layout.components.image.name",
           "icon": "image-card.svg",
           "dragType": "card",
           "defaults": {
             "component": {
               "name": "image-card",
               "settings": {
                 "src": "",
                 "alt": "",
                 "caption": "",
               }
             }
           }
         },
          {
            "name": "markdown-card",
            "i18n": "layout.components.markdown.name",
            "icon":"text-card.svg",
            "dragType": "card",
            "defaults": {
              "component":{
                "name":"markdown-card",
              }
            }
          }
        ];
   }


 });
