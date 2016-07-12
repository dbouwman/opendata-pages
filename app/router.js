import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('pages', function() {
    this.route('new');
    this.route('page', {path:':id'}, function(){
      this.route('index', {path: '/'});
      this.route('edit');
    });
  });

  this.route('people', function() {
    this.route('user', { path: ':username' }, function () {
      this.route('pages');
      this.route('my-data', { resetNamespace: true, path: '/data' });
    });
  });
    this.route('signin');

});

export default Router;
