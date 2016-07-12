/* jshint node:true */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var gitInfo = require('git-repo-info');
// var rtlcss = require('rtlcss');
var env = EmberApp.env() || 'development';
var isProductionLikeBuild = ['production', 'devext', 'qaext', 'integration'].indexOf(env) > -1;

module.exports = function (defaults) {
  console.log('BUILD: Env is ' + env);
  // setup some build options based on the environment
  var fingerprintOptions = {
    enabled: isProductionLikeBuild,
    extensions: [ 'js', 'css', 'png', 'jpg', 'gif', 'map', 'ico', 'eot', 'svg', 'ttf', 'woff', 'woff2' ],
    exclude: ['umbrella/hero', 'umbrella/noteworthy', 'categories', 'charts'],
    generateAssetMap: true,
  };

  var vendorOptions = {'jquery.js': false };
  // we have to prepend different asset urls based on the environment
  switch (env) {
    case 'test':
      console.log('Including jQuery in vendor.js for dev/test');
      vendorOptions = {};
      break;
    case 'development':
      fingerprintOptions.prepend = 'http://localui.arcgis.com:4200/';
      console.log('Including jQuery in vendor.js for dev/test');
      vendorOptions = {};
      break;
    case 'integration':
      break;
    case 'devext':
      fingerprintOptions.prepend = 'http://dev-od-umbrella-assets.s3-website-us-east-1.amazonaws.com/'; // use fingerprinting to prepend your ember server domain path
      // fingerprintOptions.prepend = 'http://dkgmy410p391h.cloudfront.net/';
      break;
    case 'demo':
      var config = require('./config/environments/' + env);
      fingerprintOptions.prepend = config.deployConfig.fingerprintPrepend;// 'http://demo-od-umbrella-assets.s3-website-us-east-1.amazonaws.com/'; // use fingerprinting to prepend your ember server domain path
      break;
    case 'qaext':
      fingerprintOptions.prepend = 'http://open-data-qa-assets.s3-website-us-east-1.amazonaws.com/'; // use fingerprinting to prepend your ember server domain path
      break;
    case 'production':
      vendorOptions = {};
      fingerprintOptions.prepend = 'opendata-pages/'; // use fingerprinting to prepend your ember server domain path
      break;
  }

  var app = new EmberApp(defaults, {
    amd: {
      loader: 'http://js.arcgis.com/3.15/init.js',
      packages: [
        'esri',
      ],
      inline: true,
      configPath: 'config/dojo-config.js',
    },

    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets',
        'node_modules/calcite-bootstrap/dist/sass',
        'node_modules/ember-cli-opendata-pages/addon/styles',
        'node_modules/ember-arcgis-page-layout/addon/styles'
      ],
      sourceMap: !isProductionLikeBuild,
    },

    fingerprint: isProductionLikeBuild,
    sourcemaps: { enabled: !isProductionLikeBuild },
    minifyCSS: { enabled: isProductionLikeBuild, options: { processImportFrom: ['local'] } },
    minifyJS: { enabled: isProductionLikeBuild },

    // IE Testing
    babel: { includePolyfill: true },
    // babel: { includePolyfill: isProductionLikeBuild },

    autoprefixer: {
      enabled: isProductionLikeBuild,
    },
    vendorFiles: vendorOptions,

    // this setups multiple sass processing chains
    outputPaths: {
      app: {
        css: {
          'app': '/assets/opendata.css'
        },
      },
    },

    inlineContent: {
      'opendata-ui-version': {
        content: '-',
        postProcess: function () {
          var result = app.project.pkg.version;
          var repoInfo = gitInfo();
          if (repoInfo && repoInfo.abbreviatedSha) {
            result += '+' + repoInfo.abbreviatedSha;
          }
          return result;
        }
      }
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/scripts/modernizr-2.8.3-custom.js');

  // enable cors ajax transport in ie9
  app.import('vendor/scripts/jQuery.XDomainRequest.js');
  app.import('vendor/scripts/lodash-opendata-ui.min.js');

  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js');
  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js');
  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js');
  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js');
  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js');
  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js');

  app.import('./bower_components/typeahead.js/dist/typeahead.jquery.js');
  app.import('./bower_components/bootstrap-drawer/dist/js/drawer.js');

  app.import('./bower_components/moment/min/moment.min.js');
  app.import('./bower_components/bootstrap-daterangepicker/daterangepicker.js');

  app.import('./bower_components/blueimp-md5/js/md5.min.js');


  // although app.import can't pull from node_modules, Funnel can
  var extraAssets = new Funnel('./node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    include: ['**.*'],
    destDir: '/assets/fonts',
  });

  return app.toTree(extraAssets);
};
