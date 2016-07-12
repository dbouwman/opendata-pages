/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'opendata-pages',
    environment: environment,
    rootURL: '/', // base for routing
    baseURL: '',
    locationType: 'auto',

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "* 'unsafe-inline' 'unsafe-eval' use.typekit.net connect.facebook.net maps.googleapis.com maps.gstatic.com",
      'font-src': "* data: use.typekit.net",
      'connect-src': "*",
      'img-src': "*",
      'style-src': "* 'unsafe-inline' use.typekit.net",
      'frame-src': "*",
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      API: 'https://opendataqa.arcgis.com',
      // Portal to use for Auth
      portalBaseUrl: 'https://qaext.arcgis.com',
      staticAssetBase: '',
      links: {
        agoUrl: 'http://qaext.arcgis.com',
        aboutOpendata: 'http://opendataqa.arcgis.com/about',
        forums: 'https://geonet.esri.com/groups/data-community',
      },
      storymapsBuilderUrl: '/apps/MapSeries/index.html?fromScratch&layout=tab&webmap=',
      geometryServiceUrl: '//utilitydev.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer',
    },
    torii: {
       sessionServiceName: 'session',
       providers: {
         'arcgis-oauth-bearer': {
           apiKey: 'J87zpPnTLsEthjDx', //QA App for Open Data Pages
           portalUrl: 'https://qaext.arcgis.com'
         }
       }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
